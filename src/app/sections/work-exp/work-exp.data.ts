export interface WorkExperience {
	dateRange: string
	location: string
	role: string
	company: string
	companyUrl?: string
	description: string
	bullets: string[]
}

export const WORK_EXPERIENCES: WorkExperience[] = [
	{
		dateRange: 'Mar 2025 - Aug 2025',
		location: 'Lisbon, Portugal (Remote)',
		role: 'Frontend (Internship)',
		company: 'TecTius - Soluções Informáticas, Lda',
		companyUrl: 'https://tectius.com/',
		description:
			'Developed a Progressive Web App for a student pilot management platform using Angular and Ionic.',
		bullets: [
			'Built a web app for ~100 student pilots using Angular and Ionic.',
			'Designed and implemented the full UI/UX, building the entire frontend in 5 months.',
			'Collaborated with 2 backend developers, preparing service requirements and integrating 5+ APIs.',
			'Delivered a Progressive Web App (PWA) with seamless REST API data flow.',
		],
	},
	{
		dateRange: 'May 2023 - Jul 2023',
		location: 'Odivelas, Lisbon, Portugal',
		role: 'Database Manager (Internship)',
		company: 'Conservatório de Música Dom Dinis',
		companyUrl: 'https://www.conservatorio-dinis.pt/',
		description:
			'During my internship in the 3rd year of the Professional Course, I analyzed company data and managed an Excel database with ~200 student records. I updated class and enrollment information accurately, ensuring data consistency and reliability for administrative and reporting purposes.',
		bullets: [
			'Managed an Excel database with ~200 student records.',
			'Updated class and enrollment records accurately.',
		],
	},
	{
		dateRange: 'May 2022 - Jul 2022',
		location: 'Loures, Lisbon, Portugal',
		role: 'Hardware Repairs and Technical Assistance (Internship)',
		company: 'RPC Informática, Lda',
		companyUrl: 'https://www.rpcinformatica.pt/',
		description:
			'During my internship in the 2nd year of the Professional Course, I provided technical support for small office and home clients. I installed and configured operating systems on 5–10 computers per week, performed hardware repairs, and assisted with internet system installations for 2–5 clients weekly. This experience helped me develop practical skills in troubleshooting, setup, and client support.',
		bullets: [
			'Installed and configured operating systems on 5–10 computers per week.',
			'Performed hardware repairs and computer setup.',
			'Assisted with internet system installations for small office/home clients (~2–5 per week).',
		],
	},
]
