import { ChangeDetectionStrategy, Component } from '@angular/core'
import { LucideArrowUpRight, LucideMinus } from '@lucide/angular'
import { WORK_EXPERIENCES } from './work-exp.data'

@Component({
	selector: 'app-work-exp',
	imports: [LucideArrowUpRight, LucideMinus],
	templateUrl: './work-exp.html',
	styleUrl: './work-exp.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'section-anchor border-t border-border/60 py-12 sm:py-14',
	},
})
export class WorkExp {
	readonly workExperiences = WORK_EXPERIENCES
}
