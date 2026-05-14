import { Routes } from '@angular/router'

export const routes: Routes = [
	{
		path: 'contact',
		title: 'Contact',
		loadComponent: () =>
			import('./pages/contact/contact').then((m) => m.Contact),
	},
]
