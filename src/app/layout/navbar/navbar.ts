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
	imports: [LucideDynamicIcon, LucideMenu, ZardButtonComponent],
	templateUrl: './navbar.html',
	styleUrl: './navbar.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
	readonly darkMode = signal(localStorage.getItem('theme') === 'dark')

	private readonly darkModeService = inject(ZardDarkMode)
	private readonly sheetService = inject(ZardSheetService)
	private readonly vcr = inject(ViewContainerRef)

	readonly menuContent = viewChild.required<TemplateRef<void>>('menuContent')
	readonly icon = computed(() => (this.darkMode() ? LucideSun : LucideMoon))

	toggleTheme(): void {
		this.darkMode.update((v) => !v)
		localStorage.setItem('theme', this.darkMode() ? 'dark' : 'light')
		this.darkModeService.toggleTheme()
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
