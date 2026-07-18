import { Component } from '@angular/core'
import { HeroActions } from './hero-actions/hero-actions'
import { HeroBio } from './hero-bio/hero-bio'
import { HeroHeader } from './hero-header/hero-header'
import { HeroProfile } from './hero-profile/hero-profile'
import { HeroSocial } from './hero-social/hero-social'

@Component({
	selector: 'app-hero',
	imports: [
		HeroProfile,
		HeroHeader,
		HeroBio,
		HeroSocial,
		HeroActions,
	],
	templateUrl: './hero.html',
	styleUrl: './hero.css',
})
export class Hero {}
