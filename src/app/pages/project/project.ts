import { Component } from '@angular/core'
import { Projects } from './projects/projects'

@Component({
	selector: 'app-project',
	imports: [Projects],
	templateUrl: './project.html',
	styleUrl: './project.css',
	host: {
		class: 'space-y-8 pb-12',
	},
})
export class Project {}
