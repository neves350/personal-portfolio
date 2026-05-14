import { Component } from '@angular/core'

@Component({
	selector: 'app-hero-focus',
	imports: [],
	templateUrl: './hero-focus.html',
	host: {
		class:
			'space-y-3 border-t border-border/60 pt-4 text-sm text-muted-foreground lg:border-t-0 lg:border-l lg:pl-6',
	},
})
export class HeroFocus {}
