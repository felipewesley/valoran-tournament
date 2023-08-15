import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";

type FormValue = {
	keys: {
		key: string;
		team1: string;
		team2: string;
	}[];
};

type FormItemType = FormGroup<{
	key: FormControl<string>;
	team1: FormControl<string>;
	team2: FormControl<string>;
}>;

type FormType = {
	keys: FormArray<FormItemType>;
};

@Injectable()
export class TournamentKeysFormService {

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

	/**
	 * Getter - Keys form instance accessor
	 */
	public get formKeys(): FormType['keys'] {

		return this._form.get('keys') as FormArray;
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
			keys: this._form.get('keys').value
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

		this._removeAllKeys();

		value.keys.forEach(() => this._addKeyGroup());

		this._form.patchValue({
			keys: value.keys
		});
	}

	/**
	 * Clear team control
	 * @param index
	 * @param team
	 */
	public clearTeamControl(index: number, team: string): void {

		(this._form.get('keys') as FormArray).at(index).get(team).reset(null);
	}

	// --------------------------------------------------
	// Private methods
	// --------------------------------------------------

	/**
	 * Add key form group to form
	 * @returns
	 */
	private _addKeyGroup(): void {

		const group: FormItemType = this._fb.group({
			key: this._fb.control(''),
			team1: this._fb.control(''),
			team2: this._fb.control('')
		});

		(this._form.get('keys') as FormArray).push(group, { emitEvent: false });
	}

	/**
	 * Removes all keys from form
	 */
	private _removeAllKeys(): void {
		(this._form.get('keys') as FormArray).clear({ emitEvent: false });
	}

	/**
	 * Builds the keys distribution form
	 * @returns
	 */
	private _buildForm(): FormGroup<FormType> {

		const form = this._fb.group({

			keys: this
				._fb
				.array<FormGroup<{ key: FormControl<string>; team1: FormControl<string>; team2: FormControl<string>; }>>([])

		}) as FormGroup<FormType>;

		return form;
	}
}
