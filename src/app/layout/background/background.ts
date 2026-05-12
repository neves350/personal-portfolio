import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-background',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="bg-layer bg-grid" aria-hidden="true"></div>
    <div class="bg-layer bg-dots" aria-hidden="true"></div>
  `,
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: -1;
      pointer-events: none;
      background-color: var(--background);
    }
    .bg-layer {
      position: absolute;
      inset: 0;
    }
  `,
})
export class Background {}
