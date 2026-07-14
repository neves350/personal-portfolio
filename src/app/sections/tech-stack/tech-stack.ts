import { Component } from '@angular/core'

@Component({
	selector: 'app-tech-stack',
	imports: [],
	templateUrl: './tech-stack.html',
	styleUrl: './tech-stack.css',
	host: {
		class: 'section-anchor border-t border-border/60 py-12 sm:py-14',
	},
})
export class TechStack {
	readonly tagClass =
		'border border-border/70 px-3 py-1.5 font-mono text-xs text-foreground/80 transition duration-300 hover:-translate-y-1 cursor-pointer hover:text-primary hover:border-primary/70'
}
