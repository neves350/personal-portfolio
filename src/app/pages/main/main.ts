import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TechStack } from '@/sections/tech-stack/tech-stack'
import { WorkExp } from '@/sections/work-exp/work-exp'
import { Contact } from '../../sections/contact/contact'
import { Hero } from '../../sections/hero/hero'

@Component({
	selector: 'app-main',
	imports: [Hero, WorkExp, TechStack, Contact],
	templateUrl: './main.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Main {}
