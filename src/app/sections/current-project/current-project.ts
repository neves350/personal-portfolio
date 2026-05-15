import { NgOptimizedImage } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { LucideArrowUpRight } from '@lucide/angular'
import { PROJECTS } from '../../pages/project/projects/projects.data'

@Component({
	selector: 'app-current-project',
	imports: [RouterLink, NgOptimizedImage, LucideArrowUpRight],
	templateUrl: './current-project.html',
	styleUrl: './current-project.css',
	host: {
		class: 'section-anchor border-t border-border/60 py-12 sm:py-14',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentProject {
	readonly projects = PROJECTS.filter((p) => p.featured)
}
