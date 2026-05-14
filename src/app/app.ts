import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Background } from './layout/background/background'
import { Footer } from './layout/footer/footer'
import { Navbar } from './layout/navbar/navbar'
import { Hero } from './sections/hero/hero'

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, Background, Navbar, Hero, Footer],
	templateUrl: './app.html',
	styleUrl: './app.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
