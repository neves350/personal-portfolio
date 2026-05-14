import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import emailjs from '@emailjs/browser'
import { toast } from 'ngx-sonner'
import { environment } from '@/../environments/environment'
import { Channels } from './channels/channels'
import type { IContactForm } from './form.interface'

@Component({
	selector: 'app-form',
	imports: [Channels, ReactiveFormsModule],
	templateUrl: './form.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'content-width grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]',
	},
})
export class Form {
	private readonly fb = inject(FormBuilder)

	readonly submitting = signal(false)

	readonly form = this.fb.nonNullable.group({
		name: ['', [Validators.required]],
		email: ['', [Validators.email, Validators.required]],
		subject: ['', [Validators.required]],
		message: ['', [Validators.required]],
	})

	get controls() {
		return this.form.controls
	}

	onSubmit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched()
			return
		}

		this.submitting.set(true)

		const data = this.form.getRawValue() as IContactForm

		emailjs
			.send(
				environment.emailjs.serviceId,
				environment.emailjs.templateId,
				{ ...data },
				{ publicKey: environment.emailjs.publicKey },
			)
			.then(() => {
				toast.success('Message sent!', {
					description: "I'll get back to you as soon as possible.",
				})
				this.form.reset()
			})
			.catch(() => {
				toast.error('Something went wrong.', {
					description: 'Please try again or reach me directly by email.',
				})
			})
			.finally(() => {
				this.submitting.set(false)
			})
	}
}
