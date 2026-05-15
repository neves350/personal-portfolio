import { NgOptimizedImage } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { LucideArrowUpRight } from '@lucide/angular'
import { PROJECTS } from './projects.data'

@Component({
	selector: 'app-projects',
	imports: [LucideArrowUpRight, NgOptimizedImage],
	templateUrl: './projects.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
	readonly projects = PROJECTS
}
