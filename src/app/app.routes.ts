import { Routes } from '@angular/router'

export const routes: Routes = [
	{
		path: '',
		title: 'Martim Neves - Portfolio',
		loadComponent: () => import('./pages/main/main').then((m) => m.Main),
	},
	{
		path: 'contact',
		title: 'Martim Neves - Contact',
		loadComponent: () =>
			import('./pages/contact/contact').then((m) => m.Contact),
	},
	{
		path: 'projects',
		title: 'Martim Neves - Projects',
		loadComponent: () =>
			import('./pages/project/project').then((m) => m.Project),
	},
]
