import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Background } from './layout/background/background';
import { Navbar } from "./layout/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Background, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
