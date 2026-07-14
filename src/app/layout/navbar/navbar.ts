import { DOCUMENT } from '@angular/common'
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	signal,
	type TemplateRef,
	ViewContainerRef,
	viewChild,
} from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import {
	LucideDynamicIcon,
	LucideMenu,
	LucideMoon,
	LucideSun,
} from '@lucide/angular'
import { ZardButtonComponent } from '@/shared/components/button'
import { ZardSheetService } from '@/shared/components/sheet'
import { ZardDarkMode } from '@/shared/services'

@Component({
	selector: 'app-navbar',
	imports: [LucideDynamicIcon, LucideMenu, ZardButtonComponent, RouterLink, RouterLinkActive],
	templateUrl: './navbar.html',
	styleUrl: './navbar.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
	readonly darkMode = signal(localStorage.getItem('theme') === 'dark')

	private readonly doc = inject(DOCUMENT)
	private readonly darkModeService = inject(ZardDarkMode)
	private readonly sheetService = inject(ZardSheetService)
	private readonly vcr = inject(ViewContainerRef)

	readonly menuContent = viewChild.required<TemplateRef<void>>('menuContent')
	readonly icon = computed(() => (this.darkMode() ? LucideSun : LucideMoon))

	toggleTheme(event?: MouseEvent): void {
		const button = (event?.currentTarget as HTMLElement) ?? null
		const doc = this.doc

		const applyChange = () => {
			this.darkMode.update((v) => !v)
			const isDark = this.darkMode()
			localStorage.setItem('theme', isDark ? 'dark' : 'light')
			doc.documentElement.classList.toggle('dark', isDark)
			doc.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
			this.darkModeService.toggleTheme()
		}

		if (!button || !('startViewTransition' in doc)) {
			applyChange()
			return
		}

		const transition = (doc as unknown as { startViewTransition: (cb: () => void) => { ready: Promise<void> } }).startViewTransition(applyChange)

		transition.ready.then(() => {
			const { top, left, width, height } = button.getBoundingClientRect()
			const x = left + width / 2
			const y = top + height / 2
			const maxRadius = Math.hypot(
				Math.max(left, window.innerWidth - left),
				Math.max(top, window.innerHeight - top),
			)

			doc.documentElement.animate(
				[
					{ clipPath: `circle(0px at ${x}px ${y}px)` },
					{ clipPath: `circle(${maxRadius}px at ${x}px ${y}px)` },
				],
				{
					duration: 400,
					easing: 'ease-in-out',
					pseudoElement: '::view-transition-new(root)',
				},
			)
		})
	}

	openMenu(): void {
		this.sheetService.create({
			zTitle: 'Explore',
			zDescription: 'Projects and ways to get in touch.',
			zContent: this.menuContent(),
			zViewContainerRef: this.vcr,
			zSide: 'right',
			zHideFooter: true,
			zMaskClosable: true,
		})
	}
}
