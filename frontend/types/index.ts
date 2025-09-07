export type FileType = 'pdf';

export interface UploadedFile {
	id: string;
	name: string;
	type: FileType;
	size: number;
	file: File;
	pageCount?: number;
	url?: string;
	thumbnail?: string;
}

export interface PageRange {
	id?: string;
	start: number;
	end: number;
	name?: string;
}

export interface SliceTask {
	id: string;
	fileId: string;
	fileName: string;
	range: PageRange;
	status: 'pending' | 'processing' | 'completed' | 'error';
	progress?: number;
	outputUrl?: string;
	blobKey?: string;
	error?: string;
}

export interface ViewerState {
	currentPage: number;
	scale: number;
	totalPages: number;
	selectedPages: Set<number>;
}
