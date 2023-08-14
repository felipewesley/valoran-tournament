import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { TOURNAMENT_CONSTANTS } from "app/domain/constants/tournament/tournament.constant";

type FormValue = {
	numberOfTeams: number;
	requestScore?: boolean;
};

type FormType = {
	numberOfTeams: FormControl<FormValue['numberOfTeams']>;
	requestScore: FormControl<FormValue['requestScore']>;
};

@Injectable()
export class TournamentSetupDialogFormService {

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
	 * Gets the form value
	 * @returns
	 */
	public getValue(): FormValue {

		const value: FormValue = {
			numberOfTeams: this._form.get('numberOfTeams')!.value,
			requestScore: this._form.get('requestScore')!.value
		};

		return value;
	}

	/**
	 * Updates the form value
	 * @param value
	 * @returns
	 */
	public patchValue(value: FormValue): void {

		if (!value)
			return void 0;

		this._form.patchValue({
			numberOfTeams: value.numberOfTeams,
			requestScore: value.requestScore
		});
	}

	// --------------------------------------------------
	// Private methods
	// --------------------------------------------------

	/**
	 * Builds the tournament setup form
	 * @returns
	 */
	private _buildForm(): FormGroup<FormType> {

		const form = this._fb.group({

			numberOfTeams: this._fb.control(TOURNAMENT_CONSTANTS.defaultNumberOfTeams, {
				validators: [
					Validators.required
				]
			}),
			requestScore: this._fb.control(false, {
				validators: [
					Validators.required
				]
			})

		}) as FormGroup<FormType>;

		return form;
	}
}
