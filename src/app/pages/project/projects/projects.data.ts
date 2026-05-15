export interface ProjectLink {
	label: string
	href: string
}

export interface Project {
	image: { src: string; alt: string }
	status: 'Active build' | 'Shipped' | 'Completed'
	dateRange: string
	title: string
	description: string
	tags: string[]
	stack: string[]
	links: ProjectLink[]
}

export const PROJECTS: Project[] = [
	{
		image: {
			src: 'project-01.png',
			alt: 'Personal Finance Manager screenshot',
		},
		status: 'Active build',
		dateRange: 'Dec 2025 - Present',
		title: 'Personal Finance Management',
		description:
			'A tracking personal and business expenses, managing budgets, and generating financial reports',
		tags: ['Angular', 'NestJS', 'FullStack', 'Personal project'],
		stack: [
			'Angular',
			'TypeScript',
			'NestJS',
			'Prisma ORM',
			'PostgreSQL',
			'Neon Console',
		],
		links: [
			{
				label: 'GitHub',
				href: 'https://github.com/neves350/personal-finance-manager',
			},
		],
	},
	{
		image: { src: 'project-03.png', alt: 'No image screenshot' },
		status: 'Active build',
		dateRange: 'May 2026 - Present',
		title: 'Personal Barbershop Website',
		description: '...',
		tags: ['Angular', 'NestJS', 'FullStack', 'Personal project'],
		stack: ['Angular', 'TypeScript', 'NestJS', 'PostgreSQL', 'Supabase'],
		links: [],
	},
	{
		image: { src: 'project-03.png', alt: 'No image screenshot' },
		status: 'Completed',
		dateRange: 'Mar 2025 - Aug 2025',
		title: 'Sky Syllabus',
		description:
			'Web application for aviation pilot students, with practice modes, school exams.',
		tags: ['Frontend', 'Academic project'],
		stack: ['Angular', 'TypeScript', 'Ionic Framework'],
		links: [],
	},
	{
		image: { src: 'project-02.png', alt: 'AEPA Website screenshot' },
		status: 'Completed',
		dateRange: 'Jan 2023 - May 2023',
		title: 'AEPA Website',
		description:
			'Final Project (PAP) - Website developed for AEPA | Professional Course TGPSI',
		tags: ['Frontend', 'Academic project'],
		stack: ['HTML', 'CSS', 'JavaScript'],
		links: [
			{
				label: 'GitHub',
				href: 'https://github.com/neves350/aepa-website',
			},
		],
	},
]
