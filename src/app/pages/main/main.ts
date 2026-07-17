import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TechStack } from '@/sections/tech-stack/tech-stack'
import { WorkExp } from '@/sections/work-exp/work-exp'
import { About } from '../../sections/about/about'
import { Contact } from '../../sections/contact/contact'
import { CurrentProject } from '../../sections/current-project/current-project'
import { GithubActivity } from '../../sections/github-activity/github-activity'
import { Hero } from '../../sections/hero/hero'

@Component({
	selector: 'app-main',
	imports: [Hero, WorkExp, TechStack, GithubActivity, Contact, About, CurrentProject],
	templateUrl: './main.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Main {}
