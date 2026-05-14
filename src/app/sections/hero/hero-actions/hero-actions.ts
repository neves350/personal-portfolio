import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
	selector: 'app-hero-actions',
	imports: [RouterLink],
	templateUrl: './hero-actions.html',
	host: {
		class: 'flex flex-wrap items-center gap-3 pt-2',
	},
})
export class HeroActions {}
