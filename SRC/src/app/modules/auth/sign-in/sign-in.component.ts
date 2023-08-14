import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { MaterialModule } from "app/shared/modules/material";

import { Subject, takeUntil } from "rxjs";
import { NotificationService } from "app/core/notification";

import { SignInFormService } from "./services/sign-in-form.service";

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: [],
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule
	],
	providers: [
		SignInFormService
	]
})
export default class SignInComponent implements OnInit, OnDestroy {

	// --------------------------------------------------
	// Properties
	// --------------------------------------------------

	public readonly form = this._formService.form;

	// Unsubscription
	private _unsubscribeAll = new Subject<void>();

	/**
	 * Constructor
	 */
	constructor(
		private _formService: SignInFormService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _notificationService: NotificationService
	) { }

	ngOnInit(): void {

		this.form.get('rememberMe')?.valueChanges
			.pipe(
				takeUntil(this._unsubscribeAll)
			)
			.subscribe(checked => {

				if (checked)
					this._formService.autoFillLoginInfo();
			});
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();
	}

	// --------------------------------------------------
	// Public methods
	// --------------------------------------------------

	/**
	 * Form submission callback
	 */
	public onSubmit(): void {

		console.log('[FORM_VALUE]:', this.form.getRawValue());

		if (this.form.invalid) {

			this._notificationService.error('Formulário inválido!');

			return void 0;
		}

		this._router
			.navigate([''], {
				relativeTo: this._activatedRoute.root
			});
	}
}
