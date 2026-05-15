import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
	selector: 'app-contact',
	imports: [],
	templateUrl: './contact.html',
	styleUrl: './contact.css',
	host: {
		class:
			'content-width section-anchor border-t border-border/60 py-12 sm:py-14',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {}
