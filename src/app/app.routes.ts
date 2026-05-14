import { Routes } from '@angular/router'

export const routes: Routes = [
	{
		path: '',
		title: 'Martim Neves',
		loadComponent: () => import('./pages/main/main').then((m) => m.Main),
	},
	{
		path: 'contact',
		title: 'Contact | Martim Neves',
		loadComponent: () =>
			import('./pages/contact/contact').then((m) => m.Contact),
	},
	{
		path: 'projects',
		title: 'Projects | Martim Neves',
		loadComponent: () =>
			import('./pages/project/project').then((m) => m.Project),
	},
]
