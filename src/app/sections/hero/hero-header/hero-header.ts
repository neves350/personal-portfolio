import { Component } from '@angular/core'
import { LucideCode, LucideMapPin } from '@lucide/angular'

@Component({
	selector: 'app-hero-header',
	imports: [LucideMapPin, LucideCode],
	templateUrl: './hero-header.html',
	host: {
		class: 'block space-y-4',
	},
})
export class HeroHeader {}
