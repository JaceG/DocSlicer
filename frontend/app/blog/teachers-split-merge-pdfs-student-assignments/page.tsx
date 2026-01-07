import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';
import { GraduationCap, BookOpen, Scissors, Layers, CheckCircle2, Clock, Zap, Users } from 'lucide-react';

export const metadata: Metadata = {
	title: 'How Teachers Can Split and Merge PDFs for Student Assignments',
	description:
		'Save hours on grading and assignment prep. Learn how teachers can use PDF tools to efficiently manage student work, create custom packets, and organize classroom documents.',
	keywords: [
		'teacher PDF tools',
		'split PDF assignments',
		'merge student work',
		'grading PDFs',
		'classroom documents',
		'teacher productivity',
		'education technology',
	],
	openGraph: {
		title: 'How Teachers Can Split and Merge PDFs for Student Assignments',
		description:
			'Essential PDF management guide for teachers. Save time on grading, create custom learning materials, and organize student work efficiently.',
		url: 'https://www.pdfwonderkit.com/blog/teachers-split-merge-pdfs-student-assignments',
	},
	alternates: {
		canonical: 'https://www.pdfwonderkit.com/blog/teachers-split-merge-pdfs-student-assignments',
	},
};

const postData: BlogPost = {
	slug: 'teachers-split-merge-pdfs-student-assignments',
	title: 'How Teachers Can Split and Merge PDFs for Student Assignments',
	description:
		'Save hours on grading and assignment prep. Learn how teachers can use PDF tools to efficiently manage student work, create custom packets, and organize classroom documents.',
	date: '2026-01-05',
	readTime: '10 min read',
	category: 'Education',
	author: 'PDF Wonder Kit Team',
	tags: [
		'education',
		'split-pdf',
		'merge-pdf',
		'teachers',
	],
	featured: false,
	toolSlug: 'merge',
	ctaTitle: 'Save Hours on Document Prep',
	ctaDescription: 'Split and merge PDFs instantly for worksheets, packets, and student portfolios. 100% browser-based — secure for student data and FERPA compliant.',
};

export default function TeachersPDFGuidePage() {
	return (
		<BlogLayout post={postData}>
			<div className='prose prose-lg max-w-none'>
				{/* Introduction */}
				<div className='bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8'>
					<div className='flex items-start gap-3'>
						<GraduationCap className='h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1' />
						<div>
							<h3 className='text-blue-900 dark:text-blue-100 mt-0 mb-2'>
								Teachers Spend 7+ Hours Per Week on Administrative
								Tasks
							</h3>
							<p className='text-blue-800 dark:text-blue-200 mb-0'>
								If you're spending precious time manually cutting
								and pasting from textbooks, printing entire
								workbooks when you only need one chapter, or
								struggling to organize submitted student work—this
								guide will save you hours every week.
							</p>
						</div>
					</div>
				</div>

				<p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed'>
					Whether you're creating differentiated learning materials,
					managing digital submissions, or preparing packets for absent
					students, knowing how to efficiently split and merge PDFs is
					an essential skill for modern educators. Let's explore
					practical workflows that actually work in the classroom.
				</p>

				{/* Time Savings Calculator */}
				<h2 className='flex items-center gap-2'>
					<Clock className='h-6 w-6 text-green-600' />
					Time Savings: What's Your Time Worth?
				</h2>

				<div className='overflow-x-auto'>
					<table className='min-w-full border-collapse text-sm'>
						<thead>
							<tr className='bg-gray-100 dark:bg-gray-800'>
								<th className='border px-4 py-2 text-left'>
									Task
								</th>
								<th className='border px-4 py-2 text-left'>
									Old Method
								</th>
								<th className='border px-4 py-2 text-left'>
									With PDF Tools
								</th>
								<th className='border px-4 py-2 text-left'>
									Time Saved
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='border px-4 py-2'>
									Create custom reading packet (15 pages from 3
									sources)
								</td>
								<td className='border px-4 py-2'>
									30 min (copy/paste, format, print)
								</td>
								<td className='border px-4 py-2'>
									3 min (extract, merge, done)
								</td>
								<td className='border px-4 py-2'>
									<span className='text-green-600 font-semibold'>
										27 min
									</span>
								</td>
							</tr>
							<tr>
								<td className='border px-4 py-2'>
									Organize 25 student submissions
								</td>
								<td className='border px-4 py-2'>
									45 min (download, rename, sort manually)
								</td>
								<td className='border px-4 py-2'>
									10 min (merge by student, label)
								</td>
								<td className='border px-4 py-2'>
									<span className='text-green-600 font-semibold'>
										35 min
									</span>
								</td>
							</tr>
							<tr>
								<td className='border px-4 py-2'>
									Prepare differentiated worksheets (3 levels)
								</td>
								<td className='border px-4 py-2'>
									40 min (create 3 versions manually)
								</td>
								<td className='border px-4 py-2'>
									8 min (extract specific pages per level)
								</td>
								<td className='border px-4 py-2'>
									<span className='text-green-600 font-semibold'>
										32 min
									</span>
								</td>
							</tr>
							<tr>
								<td className='border px-4 py-2'>
									Create makeup packet for absent student
								</td>
								<td className='border px-4 py-2'>
									25 min (find all materials, print separately)
								</td>
								<td className='border px-4 py-2'>
									5 min (merge week's materials)
								</td>
								<td className='border px-4 py-2'>
									<span className='text-green-600 font-semibold'>
										20 min
									</span>
								</td>
							</tr>
							<tr className='bg-green-50 dark:bg-green-900/20'>
								<td className='border px-4 py-2 font-bold'>
									Weekly Total (doing these 4 tasks once/week)
								</td>
								<td className='border px-4 py-2'>
									140 minutes
								</td>
								<td className='border px-4 py-2'>
									26 minutes
								</td>
								<td className='border px-4 py-2'>
									<span className='text-green-600 font-bold text-base'>
										114 min = Nearly 2 hours!
									</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className='bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 rounded-r-lg mt-4'>
					<p className='text-green-900 dark:text-green-100 font-semibold mb-2'>
						💡 That's 2 hours per week = 70+ hours per school year!
					</p>
					<p className='text-green-800 dark:text-green-200 mb-0'>
						Imagine what you could do with an extra 70 hours:
						personalized instruction, creative lesson planning, or
						(revolutionary idea) going home on time.
					</p>
				</div>

				{/* Common Teacher Use Cases */}
				<h2 className='flex items-center gap-2'>
					<BookOpen className='h-6 w-6 text-purple-600' />
					10 Ways Teachers Use PDF Tools Daily
				</h2>

				<div className='grid md:grid-cols-2 gap-6'>
					<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5 border border-blue-200 dark:border-blue-800'>
						<h3 className='text-base font-bold text-blue-900 dark:text-blue-100 mt-0 mb-3 flex items-center gap-2'>
							<Scissors className='h-5 w-5' />
							1. Creating Custom Reading Packets
						</h3>
						<p className='text-sm text-blue-800 dark:text-blue-200 mb-2'>
							<strong>Problem:</strong> Textbook chapters 3, 7, and
							12 are relevant, but printing all 300 pages is
							wasteful.
						</p>
						<p className='text-sm text-blue-800 dark:text-blue-200 mb-0'>
							<strong>Solution:</strong> Extract just those chapters
							(40 pages total), merge into one custom packet.
						</p>
					</div>

					<div className='bg-purple-50 dark:bg-purple-900/20 rounded-lg p-5 border border-purple-200 dark:border-purple-800'>
						<h3 className='text-base font-bold text-purple-900 dark:text-purple-100 mt-0 mb-3 flex items-center gap-2'>
							<Layers className='h-5 w-5' />
							2. Merging Student Submissions
						</h3>
						<p className='text-sm text-purple-800 dark:text-purple-200 mb-2'>
							<strong>Problem:</strong> 28 students submitted
							separate essay PDFs via Google Classroom.
						</p>
						<p className='text-sm text-purple-800 dark:text-purple-200 mb-0'>
							<strong>Solution:</strong> Merge all into one document
							for easier grading and commenting.
						</p>
					</div>

					<div className='bg-green-50 dark:bg-green-900/20 rounded-lg p-5 border border-green-200 dark:border-green-800'>
						<h3 className='text-base font-bold text-green-900 dark:text-green-100 mt-0 mb-3 flex items-center gap-2'>
							<Users className='h-5 w-5' />
							3. Differentiated Instruction Materials
						</h3>
						<p className='text-sm text-green-800 dark:text-green-200 mb-2'>
							<strong>Problem:</strong> Need three difficulty levels
							of the same assignment.
						</p>
						<p className='text-sm text-green-800 dark:text-green-200 mb-0'>
							<strong>Solution:</strong> Extract specific problem
							sets from master worksheet for each level.
						</p>
					</div>

					<div className='bg-orange-50 dark:bg-orange-900/20 rounded-lg p-5 border border-orange-200 dark:border-orange-800'>
						<h3 className='text-base font-bold text-orange-900 dark:text-orange-100 mt-0 mb-3 flex items-center gap-2'>
							<CheckCircle2 className='h-5 w-5' />
							4. Student Portfolio Assembly
						</h3>
						<p className='text-sm text-orange-800 dark:text-orange-200 mb-2'>
							<strong>Problem:</strong> End-of-year portfolios
							require collecting work from September through May.
						</p>
						<p className='text-sm text-orange-800 dark:text-orange-200 mb-0'>
							<strong>Solution:</strong> Merge each student's best
							work into one showcase PDF.
						</p>
					</div>

					<div className='bg-pink-50 dark:bg-pink-900/20 rounded-lg p-5 border border-pink-200 dark:border-pink-800'>
						<h3 className='text-base font-bold text-pink-900 dark:text-pink-100 mt-0 mb-3 flex items-center gap-2'>
							<Zap className='h-5 w-5' />
							5. Absent Student Makeup Packets
						</h3>
						<p className='text-sm text-pink-800 dark:text-pink-200 mb-2'>
							<strong>Problem:</strong> Student missed Mon-Wed, needs
							all three days' work.
						</p>
						<p className='text-sm text-pink-800 dark:text-pink-200 mb-0'>
							<strong>Solution:</strong> Merge Monday, Tuesday, and
							Wednesday materials into one "Catch-Up Packet."
						</p>
					</div>

					<div className='bg-teal-50 dark:bg-teal-900/20 rounded-lg p-5 border border-teal-200 dark:border-teal-800'>
						<h3 className='text-base font-bold text-teal-900 dark:text-teal-100 mt-0 mb-3 flex items-center gap-2'>
							<BookOpen className='h-5 w-5' />
							6. Study Guide Creation
						</h3>
						<p className='text-sm text-teal-800 dark:text-teal-200 mb-2'>
							<strong>Problem:</strong> Test covers 4 chapters;
							students need condensed review materials.
						</p>
						<p className='text-sm text-teal-800 dark:text-teal-200 mb-0'>
							<strong>Solution:</strong> Extract key pages from each
							chapter, merge into comprehensive study guide.
						</p>
					</div>

					<div className='bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-5 border border-indigo-200 dark:border-indigo-800'>
						<h3 className='text-base font-bold text-indigo-900 dark:text-indigo-100 mt-0 mb-3 flex items-center gap-2'>
							<Scissors className='h-5 w-5' />
							7. Parent Communication Packets
						</h3>
						<p className='text-sm text-indigo-800 dark:text-indigo-200 mb-2'>
							<strong>Problem:</strong> Parent-teacher conferences
							require student work samples.
						</p>
						<p className='text-sm text-indigo-800 dark:text-indigo-200 mb-0'>
							<strong>Solution:</strong> Merge progress reports,
							graded work, and attendance into one family packet.
						</p>
					</div>

					<div className='bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-5 border border-yellow-200 dark:border-yellow-800'>
						<h3 className='text-base font-bold text-yellow-900 dark:text-yellow-100 mt-0 mb-3 flex items-center gap-2'>
							<Layers className='h-5 w-5' />
							8. Splitting Workbooks by Unit
						</h3>
						<p className='text-sm text-yellow-800 dark:text-yellow-200 mb-2'>
							<strong>Problem:</strong> 200-page workbook PDF is too
							large to print/share all at once.
						</p>
						<p className='text-sm text-yellow-800 dark:text-yellow-200 mb-0'>
							<strong>Solution:</strong> Split into Unit 1 (pages
							1-50), Unit 2 (51-100), etc.
						</p>
					</div>

					<div className='bg-red-50 dark:bg-red-900/20 rounded-lg p-5 border border-red-200 dark:border-red-800'>
						<h3 className='text-base font-bold text-red-900 dark:text-red-100 mt-0 mb-3 flex items-center gap-2'>
							<CheckCircle2 className='h-5 w-5' />
							9. Group Project Organization
						</h3>
						<p className='text-sm text-red-800 dark:text-red-200 mb-2'>
							<strong>Problem:</strong> Each group submitted parts
							individually; need complete project files.
						</p>
						<p className='text-sm text-red-800 dark:text-red-200 mb-0'>
							<strong>Solution:</strong> Merge all parts from each
							group into one final project PDF per group.
						</p>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-base font-bold text-gray-900 dark:text-gray-100 mt-0 mb-3 flex items-center gap-2'>
							<Zap className='h-5 w-5' />
							10. Creating Answer Keys
						</h3>
						<p className='text-sm text-gray-800 dark:text-gray-300 mb-2'>
							<strong>Problem:</strong> Answer key is embedded in
							500-page teacher edition.
						</p>
						<p className='text-sm text-gray-800 dark:text-gray-300 mb-0'>
							<strong>Solution:</strong> Extract just the answer
							pages, create standalone key for student self-check.
						</p>
					</div>
				</div>

				{/* Step-by-Step Workflows */}
				<h2>Step-by-Step Teacher Workflows</h2>

				<div className='space-y-8'>
					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border-2 border-blue-200 dark:border-blue-800'>
						<h3 className='text-lg font-semibold mt-0 mb-4 flex items-center gap-2'>
							<Scissors className='h-6 w-6 text-blue-600' />
							Workflow 1: Creating Custom Reading Packets
						</h3>
						<p className='text-sm mb-4'>
							<strong>Scenario:</strong> You're teaching American
							History and need to create a packet combining relevant
							sections from the textbook, a primary source document,
							and a current events article.
						</p>

						<div className='bg-white dark:bg-gray-900 rounded p-5 border border-gray-300 dark:border-gray-700'>
							<h4 className='text-base font-semibold mb-3'>
								Step-by-Step:
							</h4>
							<ol className='space-y-3 mb-0'>
								<li className='text-sm'>
									<strong>Step 1: Gather Your Sources</strong>
									<ul className='mt-2 ml-4 space-y-1'>
										<li>Textbook PDF (pages 234-248 on Civil War)</li>
										<li>
											Gettysburg Address PDF (2 pages)
										</li>
										<li>
											Modern article on historical memory (5
											pages)
										</li>
									</ul>
								</li>
								<li className='text-sm'>
									<strong>Step 2: Extract Needed Sections</strong>
									<ul className='mt-2 ml-4 space-y-1'>
										<li>
											Go to{' '}
											<Link
												href='/'
												className='text-blue-600 hover:underline'>
												PDF Wonder Kit.com
											</Link>
										</li>
										<li>
											Upload textbook PDF → Extract pages
											234-248
										</li>
										<li>
											Upload article PDF → Extract pages 1-5
										</li>
										<li>
											Gettysburg Address is already just 2
											pages
										</li>
									</ul>
								</li>
								<li className='text-sm'>
									<strong>Step 3: Merge in Logical Order</strong>
									<ul className='mt-2 ml-4 space-y-1'>
										<li>Switch to "Merge PDF" mode</li>
										<li>
											Upload in order: Textbook excerpt (15
											pages), Gettysburg Address (2 pages),
											Article (5 pages)
										</li>
										<li>
											Name: "Civil_War_Reading_Packet_Week8.pdf"
										</li>
									</ul>
								</li>
								<li className='text-sm'>
									<strong>Step 4: Share with Students</strong>
									<ul className='mt-2 ml-4 space-y-1'>
										<li>
											Upload to Google Classroom / Canvas / LMS
										</li>
										<li>Or print 22-page packet (way better than 300!)</li>
										<li>Total time: 5 minutes vs. 30+ manually</li>
									</ul>
								</li>
							</ol>
						</div>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border-2 border-purple-200 dark:border-purple-800'>
						<h3 className='text-lg font-semibold mt-0 mb-4 flex items-center gap-2'>
							<Layers className='h-6 w-6 text-purple-600' />
							Workflow 2: Organizing Student Essay Submissions
						</h3>
						<p className='text-sm mb-4'>
							<strong>Scenario:</strong> 25 students submitted their
							5-paragraph essays via Google Classroom. You want to
							grade them all in one sitting with consistent rubric
							application.
						</p>

						<div className='bg-white dark:bg-gray-900 rounded p-5 border border-gray-300 dark:border-gray-700'>
							<h4 className='text-base font-semibold mb-3'>
								Step-by-Step:
							</h4>
							<ol className='space-y-3 mb-0'>
								<li className='text-sm'>
									<strong>Step 1: Download All Submissions</strong>
									<ul className='mt-2 ml-4 space-y-1'>
										<li>
											In Google Classroom, click "Download
											all" from assignment
										</li>
										<li>
											You'll get 25 separate PDFs (usually
											named by student)
										</li>
									</ul>
								</li>
								<li className='text-sm'>
									<strong>Step 2: Merge into One Grading Document</strong>
									<ul className='mt-2 ml-4 space-y-1'>
										<li>
											Go to PDF Wonder Kit → Merge PDF mode
										</li>
										<li>
											Upload all 25 PDFs at once (drag and
											drop entire folder)
										</li>
										<li>
											They'll automatically be ordered
											alphabetically
										</li>
										<li>
											Name: "Period_3_Essays_Feb2026_AllStudents.pdf"
										</li>
									</ul>
								</li>
								<li className='text-sm'>
									<strong>Step 3: Grade Efficiently</strong>
									<ul className='mt-2 ml-4 space-y-1'>
										<li>
											Open merged PDF in your preferred
											annotation tool
										</li>
										<li>
											Grade all essays in one session with
											consistent standards
										</li>
										<li>
											Use PDF annotation tools to add comments
										</li>
									</ul>
								</li>
								<li className='text-sm'>
									<strong>Step 4: Return Graded Work</strong>
									<ul className='mt-2 ml-4 space-y-1'>
										<li>
											Option A: Split merged PDF back into
											individual files
										</li>
										<li>
											Option B: Use LMS's "Return work"
											feature with comments
										</li>
									</ul>
								</li>
							</ol>
						</div>

						<div className='mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-300 dark:border-purple-700'>
							<p className='text-sm text-purple-900 dark:text-purple-100 mb-2'>
								<strong>Pro Tip:</strong> Add a blank page between
								each student's essay for scratch notes/rubric
								calculations!
							</p>
							<p className='text-sm text-purple-800 dark:text-purple-200 mb-0'>
								Create a blank PDF page in Google Docs, then
								alternate: Student1 essay → blank page → Student2
								essay → blank page, etc.
							</p>
						</div>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border-2 border-green-200 dark:border-green-800'>
						<h3 className='text-lg font-semibold mt-0 mb-4 flex items-center gap-2'>
							<Users className='h-6 w-6 text-green-600' />
							Workflow 3: Differentiated Math Worksheets
						</h3>
						<p className='text-sm mb-4'>
							<strong>Scenario:</strong> Your master worksheet has 30
							problems at varying difficulty levels. You need to
							create three versions: below-grade-level (10
							problems), on-level (15 problems), and advanced (20
							problems).
						</p>

						<div className='bg-white dark:bg-gray-900 rounded p-5 border border-gray-300 dark:border-gray-700'>
							<h4 className='text-base font-semibold mb-3'>
								Step-by-Step:
							</h4>
							<ol className='space-y-3 mb-0'>
								<li className='text-sm'>
									<strong>Step 1: Identify Problem Pages</strong>
									<ul className='mt-2 ml-4 space-y-1'>
										<li>
											Master worksheet: Pages 1-6 (30 problems
											total)
										</li>
										<li>
											Easy problems: Pages 1-2 (problems 1-10)
										</li>
										<li>
											Medium problems: Pages 1-3 (problems
											1-15)
										</li>
										<li>
											Hard problems: Pages 1-4 (problems 1-20)
										</li>
									</ul>
								</li>
								<li className='text-sm'>
									<strong>Step 2: Extract Three Versions</strong>
									<ul className='mt-2 ml-4 space-y-1'>
										<li>Upload master worksheet to PDF Wonder Kit</li>
										<li>
											Extract pages 1-2 → Save as
											"Algebra_Worksheet_3_Level_A.pdf"
										</li>
										<li>
											Extract pages 1-3 → Save as
											"Algebra_Worksheet_3_Level_B.pdf"
										</li>
										<li>
											Extract pages 1-4 → Save as
											"Algebra_Worksheet_3_Level_C.pdf"
										</li>
									</ul>
								</li>
								<li className='text-sm'>
									<strong>Step 3: Distribute to Students</strong>
									<ul className='mt-2 ml-4 space-y-1'>
										<li>
											Level A students get 10 problems (just
											enough practice)
										</li>
										<li>
											Level B students get 15 problems
											(standard practice)
										</li>
										<li>
											Level C students get 20 problems
											(challenge themselves)
										</li>
										<li>
											Everyone works on appropriate material!
										</li>
									</ul>
								</li>
							</ol>
						</div>

						<div className='mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-300 dark:border-green-700'>
							<p className='text-sm text-green-900 dark:text-green-100 font-semibold mb-1'>
								💡 Differentiation Made Easy:
							</p>
							<p className='text-sm text-green-800 dark:text-green-200 mb-0'>
								No need to create three separate worksheets from
								scratch. One master document + strategic extraction
								= differentiated instruction in minutes!
							</p>
						</div>
					</div>
				</div>

				{/* Teacher-Specific Tips */}
				<h2>Teacher Pro Tips</h2>

				<div className='grid md:grid-cols-2 gap-6'>
					<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5 border border-blue-200 dark:border-blue-800'>
						<h3 className='text-base font-bold text-blue-900 dark:text-blue-100 mt-0 mb-3'>
							📝 Naming Convention System
						</h3>
						<p className='text-sm text-blue-800 dark:text-blue-200 mb-2'>
							Create a consistent naming system:
						</p>
						<ul className='text-sm text-blue-800 dark:text-blue-200 mb-0 space-y-1'>
							<li>
								<code className='text-xs'>
									Subject_Topic_Week#_Type.pdf
								</code>
							</li>
							<li>
								Example:{' '}
								<code className='text-xs'>
									Math_Fractions_Week12_Worksheet.pdf
								</code>
							</li>
							<li>
								For students:{' '}
								<code className='text-xs'>
									LastName_FirstName_Assignment.pdf
								</code>
							</li>
						</ul>
					</div>

					<div className='bg-purple-50 dark:bg-purple-900/20 rounded-lg p-5 border border-purple-200 dark:border-purple-800'>
						<h3 className='text-base font-bold text-purple-900 dark:text-purple-100 mt-0 mb-3'>
							🗂️ Digital Filing System
						</h3>
						<p className='text-sm text-purple-800 dark:text-purple-200 mb-0'>
							Organize extracted/merged files:
							<br />
							<code className='text-xs'>
								/2025-2026/Period 3/Unit 4/
							</code>
							<br />• Worksheets/
							<br />• Student_Work/
							<br />• Answer_Keys/
							<br />
							Consistent structure = easy to find everything.
						</p>
					</div>

					<div className='bg-green-50 dark:bg-green-900/20 rounded-lg p-5 border border-green-200 dark:border-green-800'>
						<h3 className='text-base font-bold text-green-900 dark:text-green-100 mt-0 mb-3'>
							⚡ Batch Processing
						</h3>
						<p className='text-sm text-green-800 dark:text-green-200 mb-0'>
							Set aside 30 minutes on Sunday to:
							<br />• Extract next week's materials from textbooks
							<br />• Merge any multi-part assignments
							<br />• Create differentiated versions
							<br />
							Then you're set for the entire week!
						</p>
					</div>

					<div className='bg-orange-50 dark:bg-orange-900/20 rounded-lg p-5 border border-orange-200 dark:border-orange-800'>
						<h3 className='text-base font-bold text-orange-900 dark:text-orange-100 mt-0 mb-3'>
							💾 Keep Master Copies
						</h3>
						<p className='text-sm text-orange-800 dark:text-orange-200 mb-0'>
							Never work from your only copy:
							<br />• Keep unedited originals in an "Archive" folder
							<br />• Make extractions/merges from copies
							<br />• This way you can always go back to the source
							<br />
							(Learned this the hard way!)
						</p>
					</div>

					<div className='bg-pink-50 dark:bg-pink-900/20 rounded-lg p-5 border border-pink-200 dark:border-pink-800'>
						<h3 className='text-base font-bold text-pink-900 dark:text-pink-100 mt-0 mb-3'>
							📱 Compress for Mobile Access
						</h3>
						<p className='text-sm text-pink-800 dark:text-pink-200 mb-0'>
							Students viewing on phones?
							<br />• Compress PDFs before sharing (reduces data
							usage)
							<br />• Aim for under 2MB for phone-friendly sizes
							<br />• PDF Wonder Kit's compression maintains readability
							<br />
							Your students (and their parents' data plans) will
							thank you!
						</p>
					</div>

					<div className='bg-teal-50 dark:bg-teal-900/20 rounded-lg p-5 border border-teal-200 dark:border-teal-800'>
						<h3 className='text-base font-bold text-teal-900 dark:text-teal-100 mt-0 mb-3'>
							🎨 Add Cover Pages
						</h3>
						<p className='text-sm text-teal-800 dark:text-teal-200 mb-0'>
							For custom packets, create simple cover pages:
							<br />• Title, your name, date, period
							<br />• Learning objectives
							<br />• Table of contents (for longer packets)
							<br />
							Makes materials look professional and helps students
							organize.
						</p>
					</div>
				</div>

				{/* Budget Considerations */}
				<h2>Saving Money on Printing & Copying</h2>

				<div className='bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-800 rounded-xl p-6'>
					<h3 className='text-green-900 dark:text-green-100 mt-0'>
						💰 Real Cost Savings for Teachers & Schools
					</h3>
					<p className='text-green-800 dark:text-green-200 mb-4'>
						Many teachers pay out-of-pocket for classroom supplies,
						including printing. Here's how PDF management helps:
					</p>

					<div className='grid md:grid-cols-2 gap-4'>
						<div className='bg-white dark:bg-gray-900 rounded p-4 border border-green-300 dark:border-green-700'>
							<h4 className='text-base font-semibold text-green-900 dark:text-green-100 mb-2'>
								Before (Wasteful Printing):
							</h4>
							<ul className='text-sm text-green-800 dark:text-green-200 mb-0 space-y-1'>
								<li>Print entire 50-page workbook × 30 students = 1,500 pages</li>
								<li>Cost: $150 (at $0.10/page)</li>
								<li>Students only use 20 pages</li>
								<li>30 pages per student wasted = 900 pages = $90 wasted</li>
							</ul>
						</div>

						<div className='bg-white dark:bg-gray-900 rounded p-4 border border-green-300 dark:border-green-700'>
							<h4 className='text-base font-semibold text-green-900 dark:text-green-100 mb-2'>
								After (Smart Extraction):
							</h4>
							<ul className='text-sm text-green-800 dark:text-green-200 mb-0 space-y-1'>
								<li>Extract only relevant 20 pages × 30 students = 600 pages</li>
								<li>Cost: $60 (at $0.10/page)</li>
								<li>Students get exactly what they need</li>
								<li>
									<strong className='text-green-700 dark:text-green-300'>
										Savings: $90 per unit!
									</strong>
								</li>
							</ul>
						</div>
					</div>

					<div className='mt-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg'>
						<p className='text-sm font-semibold text-green-900 dark:text-green-100 mb-1'>
							Over One School Year:
						</p>
						<p className='text-sm text-green-800 dark:text-green-200 mb-0'>
							If you do this for 6 units throughout the year: <strong>$540 saved!</strong>
							<br />
							That's 5+ reams of paper, or supplies for your classroom, or
							(radical idea) money back in your pocket.
						</p>
					</div>
				</div>

				{/* FAQ */}
				<h2>Teacher FAQ</h2>

				<div className='space-y-6'>
					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold mt-0'>
							Can I use PDF Wonder Kit with copyrighted textbooks?
						</h3>
						<p className='mb-0'>
							For personal classroom use and creating materials for
							your students, extracting portions of textbooks you
							have legal access to is generally covered under fair
							use (educational purposes). However, do NOT
							redistribute entire textbooks or publish extracted
							materials online. Check your school's policies on
							digital textbook usage.
						</p>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold mt-0'>
							Is PDF Wonder Kit FERPA compliant for student records?
						</h3>
						<p className='mb-0'>
							Yes! PDF Wonder Kit processes all files locally in your
							browser—student work never leaves your device. No
							student data is uploaded to external servers. This
							makes it inherently FERPA compliant. Always follow your
							district's data privacy policies when handling student
							information.
						</p>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold mt-0'>
							Can I use this on my school computer?
						</h3>
						<p className='mb-0'>
							Absolutely! PDF Wonder Kit runs in any web browser (Chrome,
							Firefox, Safari, Edge) with no installation required.
							Even if your school restricts software installations,
							you can use PDF Wonder Kit because it's a website. It works
							offline too (after the page loads).
						</p>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold mt-0'>
							How many PDFs can I process per month on the free plan?
						</h3>
						<p className='mb-0'>
							Free plan: 3 PDFs per month (splits, merges, or
							compressions combined)
							<br />
							Premium plan ($2/month): Unlimited processing, up to
							100MB files, ZIP downloads for multiple extractions
							<br />
							Many teachers find the premium plan worthwhile—it's
							less than a coffee and saves hours each week!
						</p>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-semibold mt-0'>
							Can I share my PDF Wonder Kit account with my department?
						</h3>
						<p className='mb-0'>
							Individual accounts are designed for single users.
							However, because processing happens locally in the
							browser, multiple teachers can use the free plan from
							their own computers. For departments wanting premium
							features for multiple users, contact us about education
							pricing.
						</p>
					</div>
				</div>

				{/* Conclusion */}
				<div className='bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
					<h2 className='mt-0'>Reclaim Your Time, Enhance Your Teaching</h2>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						You became a teacher to inspire students, not to fight
						with photocopiers and spend hours on administrative tasks.
						Efficient PDF management gives you back the time you need
						for what really matters: teaching.
					</p>
					<p className='text-sm text-gray-600 dark:text-gray-400 mb-0'>
						<strong>Teacher Tip:</strong> Bookmark PDF Wonder Kit and add it
						to your Sunday planning routine. You'll wonder how you
						ever managed without it!
					</p>
				</div>
			</div>
		</BlogLayout>
	);
}
