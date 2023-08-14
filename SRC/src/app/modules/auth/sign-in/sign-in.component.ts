import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { MaterialModule } from "app/shared/modules/material";

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
export default class SignInComponent implements OnInit {

	// --------------------------------------------------
	// Properties
	// --------------------------------------------------

	public readonly form = this._formService.form;

	/**
	 * Constructor
	 */
	constructor(
		private _formService: SignInFormService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute
	) { }

	ngOnInit(): void {

	}

	// --------------------------------------------------
	// Public methods
	// --------------------------------------------------

	/**
	 * Form submission callback
	 */
	public onSubmit(): void {

		console.log('onsubmit', this.form.getRawValue());

		this._router
			.navigate([''], {
				relativeTo: this._activatedRoute.root
			});
	}
}
