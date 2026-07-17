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
]
