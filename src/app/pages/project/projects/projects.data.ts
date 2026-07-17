export interface ProjectLink {
	label: string
	href: string
}

export interface Project {
	image: { src: string; alt: string }
	status: 'Active build' | 'Live' | 'Completed'
	dateRange: string
	title: string
	description: string
	tags: string[]
	stack: string[]
	links: ProjectLink[]
	featured?: boolean
}

export const PROJECTS: Project[] = [
	{
		image: {
			src: 'project-01.png',
			alt: 'Personal Finance Manager screenshot',
		},
		status: 'Live',
		dateRange: 'January 2026 - Present',
		title: 'Trocos',
		description:
			'A tracking personal and business expenses, managing budgets, and generating financial reports',
		tags: ['Angular', 'NestJS', 'TypeScript', 'Personal project'],
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
				label: 'Website',
				href: 'https://trocos.vercel.app/',
			},
			{
				label: 'GitHub',
				href: 'https://github.com/neves350/trocos',
			},
		],
		featured: true,
	},
	{
		image: { src: 'project-03.png', alt: 'No image screenshot' },
		status: 'Active build',
		dateRange: 'July 2026 - Present',
		title: 'Bora',
		description:
			'Focus timer and study analytics - sessions, streaks, and subject-level progress tracking.',
		tags: ['Angular', 'NestJS', 'TypeScript', 'Personal project'],
		stack: [
			'Angular',
			'TypeScript',
			'NestJS',
			'Prisma ORM',
			'PostgreSQL',
			'Neon Console',
			'Docker',
		],
		links: [
			{
				label: 'GitHub',
				href: 'https://github.com/neves350/bora-tracker',
			},
		],
		featured: true,
	},
	{
		image: { src: 'project-03.png', alt: 'No image screenshot' },
		status: 'Completed',
		dateRange: 'Mar 2025 - Aug 2025',
		title: 'Sky Syllabus',
		description:
			'Web application for aviation pilot students, with practice modes, school exams.',
		tags: ['Angular', 'TypeScript', 'Academic project'],
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
