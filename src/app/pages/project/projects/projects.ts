import { NgOptimizedImage } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { LucideArrowUpRight, LucideGlobe } from '@lucide/angular'
import type { Project } from './projects.data'
import { PROJECTS } from './projects.data'

@Component({
	selector: 'app-projects',
	imports: [LucideArrowUpRight, LucideGlobe, NgOptimizedImage],
	templateUrl: './projects.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
	readonly projects = PROJECTS

	readonly accentClasses = [
		'via-lime-400/50 from-lime-400/15',
		'via-rose-400/50 from-rose-400/15',
		'via-orange-400/50 from-orange-400/15',
		'via-sky-400/50 from-sky-400/15',
	]

	readonly statusDot: Record<Project['status'], string> = {
		'Active build': 'bg-orange-400',
		Live: 'bg-lime-400',
		Completed: 'bg-sky-400',
	}
}
