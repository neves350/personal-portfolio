import { NgOptimizedImage } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { LucideGlobe } from '@lucide/angular'
import type { Project } from '../../pages/project/projects/projects.data'
import { PROJECTS } from '../../pages/project/projects/projects.data'

@Component({
	selector: 'app-current-project',
	imports: [RouterLink, NgOptimizedImage, LucideGlobe],
	templateUrl: './current-project.html',
	styleUrl: './current-project.css',
	host: {
		class: 'section-anchor border-t border-border/60 py-12 sm:py-14',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentProject {
	readonly projects = PROJECTS.filter((p) => p.featured)

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
