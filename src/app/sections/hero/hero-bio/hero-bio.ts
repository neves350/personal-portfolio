import { Component } from '@angular/core'

@Component({
	selector: 'app-hero-bio',
	imports: [],
	templateUrl: './hero-bio.html',
	host: {
		class:
			'block max-w-2xl space-y-4 text-[1.02rem] leading-8 text-foreground/80',
	},
})
export class HeroBio {}
