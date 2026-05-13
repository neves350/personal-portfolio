import { Component } from '@angular/core'
import { LucideCode, LucideMapPin } from '@lucide/angular'

@Component({
	selector: 'app-hero-header',
	imports: [LucideMapPin, LucideCode],
	templateUrl: './hero-header.html',
})
export class HeroHeader {}
