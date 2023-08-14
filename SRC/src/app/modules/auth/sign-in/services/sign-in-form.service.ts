import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { SIGN_IN_CONSTANTS } from "app/domain/constants/auth/login.constant";

type FormValue = {
	email: string;
	password: string;
	rememberMe: boolean;
};

type FormType = {
	email: FormControl<FormValue['email']>;
	password: FormControl<FormValue['password']>;
	rememberMe: FormControl<FormValue['rememberMe']>;
};

@Injectable()
export class SignInFormService {

	// --------------------------------------------------
	// Properties
	// --------------------------------------------------

	private _form = this._buildForm();

	/**
	 * Constructor
	 */
	constructor(
		private _fb: FormBuilder
	) { }

	// --------------------------------------------------
	// Accessors
	// --------------------------------------------------

	/**
	 * Getter - Form instance accessor
	 */
	public get form(): FormGroup<FormType> {

		return this._form;
	}

	// --------------------------------------------------
	// Public methods
	// --------------------------------------------------

	/**
	 * Auto complete the login fields with default values
	 */
	public autoFillLoginInfo(): void {

		const defaultLogin = SIGN_IN_CONSTANTS.defaultLogin;

		this._form.patchValue({
			email: defaultLogin.email,
			password: defaultLogin.password
		});
	}

	// --------------------------------------------------
	// Private methods
	// --------------------------------------------------

	/**
	 * Builds the login form
	 * @returns
	 */
	private _buildForm(): FormGroup<FormType> {

		const form = this._fb.group({

			email: this._fb.control('', {
				validators: [
					Validators.required,
					Validators.email
				]
			}),
			password: this._fb.control('', {
				validators: [
					Validators.required
				]
			}),
			rememberMe: this._fb.control(false)

		}) as FormGroup<FormType>;

		return form;
	}
}
