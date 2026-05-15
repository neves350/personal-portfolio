import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
	selector: 'app-about',
	imports: [],
	templateUrl: './about.html',
	styleUrl: './about.css',
	host: {
		class: 'content-width section-anchor py-6 sm:py-8',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {}
