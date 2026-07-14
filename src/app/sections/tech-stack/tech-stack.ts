import { Component } from '@angular/core'

interface StackCategory {
	title: string
	items: { name: string; icon: string }[]
}

@Component({
	selector: 'app-tech-stack',
	imports: [],
	templateUrl: './tech-stack.html',
	styleUrl: './tech-stack.css',
	host: {
		class: 'section-anchor border-t border-border/60 py-12 sm:py-14',
	},
})
export class TechStack {
	readonly tagClass =
		'flex items-center gap-1.5 border border-border/70 px-3 py-1.5 font-mono text-xs text-foreground/80 transition duration-300 hover:-translate-y-1 cursor-pointer hover:text-primary hover:border-primary/70'

	readonly categories: StackCategory[] = [
		{
			title: 'Languages',
			items: [
				{ name: 'TypeScript', icon: 'stack/typescript.svg' },
				{ name: 'JavaScript', icon: 'stack/javascript.svg' },
				{ name: 'HTML', icon: 'stack/html.svg' },
				{ name: 'CSS', icon: 'stack/css.svg' },
			],
		},
		{
			title: 'Frontend',
			items: [
				{ name: 'Angular', icon: 'stack/angular.svg' },
				{ name: 'Ionic', icon: 'stack/ionic.svg' },
				{ name: 'Tailwind CSS', icon: 'stack/tailwindcss.svg' },
				{ name: 'PrimeNG', icon: 'stack/primeng.svg' },
			],
		},
		{
			title: 'Backend',
			items: [
				{ name: 'NestJS', icon: 'stack/nestjs.svg' },
				{ name: 'PostgreSQL', icon: 'stack/postgresql.svg' },
				{ name: 'Prisma', icon: 'stack/prisma.svg' },
			],
		},
		{
			title: 'Testing',
			items: [
				{ name: 'Vitest', icon: 'stack/vitest.svg' },
				{ name: 'Jest', icon: 'stack/jest.svg' },
			],
		},
		{
			title: 'Tools',
			items: [
				{ name: 'Git', icon: 'stack/git.svg' },
				{ name: 'Figma', icon: 'stack/figma.svg' },
				{ name: 'Warp', icon: 'stack/warp.svg' },
			],
		},
	]
}
