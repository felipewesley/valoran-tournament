import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

type FormValue = {
	email: string;
	password: string;
};

type FormType = {
	email: FormControl<FormValue['email']>;
	password: FormControl<FormValue['password']>;
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
			})

		}) as FormGroup<FormType>;

		return form;
	}
}
