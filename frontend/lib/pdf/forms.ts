/**
 * PDF Forms Filler Library
 * 
 * Provides functionality to detect and fill interactive PDF forms:
 * - Text fields
 * - Checkboxes
 * - Radio buttons
 * - Dropdown selects
 */

import { PDFDocument, PDFTextField, PDFCheckBox, PDFDropdown, PDFRadioGroup, PDFForm } from 'pdf-lib';
import { FormField, FormFieldType } from '@/types';

/**
 * Detect form fields in a PDF
 */
export async function detectFormFields(
	file: File,
	onProgress?: (progress: number) => void
): Promise<FormField[]> {
	onProgress?.(10);
	
	const arrayBuffer = await file.arrayBuffer();
	const pdfDoc = await PDFDocument.load(arrayBuffer);
	
	onProgress?.(30);
	
	const form = pdfDoc.getForm();
	const fields = form.getFields();
	const formFields: FormField[] = [];
	
	onProgress?.(50);
	
	fields.forEach((field, index) => {
		const name = field.getName();
		let type: FormFieldType = 'text';
		let value: string | boolean = '';
		let options: string[] | undefined;
		
		// Determine field type and get current value
		if (field instanceof PDFTextField) {
			type = 'text';
			value = field.getText() || '';
		} else if (field instanceof PDFCheckBox) {
			type = 'checkbox';
			value = field.isChecked();
		} else if (field instanceof PDFDropdown) {
			type = 'dropdown';
			value = field.getSelected()?.[0] || '';
			options = field.getOptions();
		} else if (field instanceof PDFRadioGroup) {
			type = 'radio';
			value = field.getSelected() || '';
			options = field.getOptions();
		}
		
		// Get widget position (simplified - takes first widget)
		const widgets = field.acroField.getWidgets();
		let x = 0, y = 0, width = 100, height = 20, pageNumber = 1;
		
		if (widgets.length > 0) {
			const widget = widgets[0];
			const rect = widget.getRectangle();
			x = rect.x;
			y = rect.y;
			width = rect.width;
			height = rect.height;
			
			// Find which page this widget is on
			const pages = pdfDoc.getPages();
			const widgetPage = widget.P();
			if (widgetPage) {
				const pageIndex = pages.findIndex(p => p.ref === widgetPage);
				pageNumber = pageIndex >= 0 ? pageIndex + 1 : 1;
			}
		}
		
		formFields.push({
			id: `field-${index}`,
			name,
			type,
			pageNumber,
			x,
			y,
			width,
			height,
			value,
			options,
			required: false, // Would need to check field flags
			readonly: field.isReadOnly(),
		});
	});
	
	onProgress?.(100);
	
	return formFields;
}

/**
 * Fill form fields in a PDF
 */
export async function fillFormFields(
	file: File,
	fieldValues: Map<string, string | boolean>,
	onProgress?: (progress: number) => void
): Promise<Blob> {
	onProgress?.(10);
	
	const arrayBuffer = await file.arrayBuffer();
	const pdfDoc = await PDFDocument.load(arrayBuffer);
	
	onProgress?.(30);
	
	const form = pdfDoc.getForm();
	const fields = form.getFields();
	
	let processed = 0;
	const total = fieldValues.size;
	
	for (const [fieldName, value] of fieldValues) {
		try {
			const field = form.getField(fieldName);
			
			if (field instanceof PDFTextField && typeof value === 'string') {
				field.setText(value);
			} else if (field instanceof PDFCheckBox && typeof value === 'boolean') {
				if (value) {
					field.check();
				} else {
					field.uncheck();
				}
			} else if (field instanceof PDFDropdown && typeof value === 'string') {
				field.select(value);
			} else if (field instanceof PDFRadioGroup && typeof value === 'string') {
				field.select(value);
			}
		} catch (error) {
			console.warn(`Failed to fill field ${fieldName}:`, error);
		}
		
		processed++;
		onProgress?.(30 + (processed / total) * 60);
	}
	
	onProgress?.(95);
	
	// Flatten form to make fields non-editable (optional)
	// form.flatten();
	
	const pdfBytes = await pdfDoc.save();
	
	onProgress?.(100);
	
	return new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
}

/**
 * Check if a PDF has fillable forms
 */
export async function hasFormFields(file: File): Promise<boolean> {
	try {
		const arrayBuffer = await file.arrayBuffer();
		const pdfDoc = await PDFDocument.load(arrayBuffer);
		const form = pdfDoc.getForm();
		const fields = form.getFields();
		return fields.length > 0;
	} catch {
		return false;
	}
}

/**
 * Flatten form fields (make them non-editable)
 */
export async function flattenForm(
	file: File,
	onProgress?: (progress: number) => void
): Promise<Blob> {
	onProgress?.(10);
	
	const arrayBuffer = await file.arrayBuffer();
	const pdfDoc = await PDFDocument.load(arrayBuffer);
	
	onProgress?.(40);
	
	const form = pdfDoc.getForm();
	form.flatten();
	
	onProgress?.(80);
	
	const pdfBytes = await pdfDoc.save();
	
	onProgress?.(100);
	
	return new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
}

/**
 * Get form field statistics
 */
export async function getFormStats(file: File): Promise<{
	totalFields: number;
	textFields: number;
	checkboxes: number;
	dropdowns: number;
	radioGroups: number;
	filledFields: number;
}> {
	const arrayBuffer = await file.arrayBuffer();
	const pdfDoc = await PDFDocument.load(arrayBuffer);
	const form = pdfDoc.getForm();
	const fields = form.getFields();
	
	let textFields = 0;
	let checkboxes = 0;
	let dropdowns = 0;
	let radioGroups = 0;
	let filledFields = 0;
	
	fields.forEach(field => {
		if (field instanceof PDFTextField) {
			textFields++;
			if (field.getText()) filledFields++;
		} else if (field instanceof PDFCheckBox) {
			checkboxes++;
			if (field.isChecked()) filledFields++;
		} else if (field instanceof PDFDropdown) {
			dropdowns++;
			if (field.getSelected()?.length) filledFields++;
		} else if (field instanceof PDFRadioGroup) {
			radioGroups++;
			if (field.getSelected()) filledFields++;
		}
	});
	
	return {
		totalFields: fields.length,
		textFields,
		checkboxes,
		dropdowns,
		radioGroups,
		filledFields,
	};
}
