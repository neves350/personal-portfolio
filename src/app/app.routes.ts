import { Routes } from '@angular/router'

export const routes: Routes = [
	{
		path: '',
		title: 'Home',
		loadComponent: () => import('./pages/main/main').then((m) => m.Main),
	},
	{
		path: 'contact',
		title: 'Contact',
		loadComponent: () =>
			import('./pages/contact/contact').then((m) => m.Contact),
	},
]
