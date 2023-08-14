import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { ArrayElementType } from "app/common/types/array-element-type";

type FormValue = {
	name: string;
	members: string[];
};

type FormType = {
	name: FormControl<FormValue['name']>;
	members: FormArray<FormControl<ArrayElementType<FormValue['members']>>>;
};

@Injectable()
export class TeamFormDialogFormService {

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
	 * Getter - Members form array accessor
	 */
	public get membersForm(): FormType['members'] {

		return this._form.get('members') as FormArray;
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
			name: this._form.get('name')!.value,
			members: this._form.get('members')!.value
		};

		return value;
	}

	public patchValue(value: FormValue): void {

		if (!value)
			return void 0;

		// Creates members controls before set the value
		value.members.forEach(() => this.addMember());

		this._form.patchValue({
			name: value.name,
			members: value.members
		});
	}

	/**
	 * Add a member in the team
	 */
	public addMember(): void {

		const memberControl = this._fb.control('', { validators: [Validators.required] });

		(this.form.get('members') as FormArray).push(memberControl);
	}

	/**
	 * Remove member from team
	 * @param index
	 */
	public removeMember(index: number): void {

		(this._form.get('members') as FormArray).removeAt(index);
	}

	// --------------------------------------------------
	// Private methods
	// --------------------------------------------------

	/**
	 * Builds the team form
	 * @returns
	 */
	private _buildForm(): FormGroup<FormType> {

		const form = this._fb.group({

			name: this._fb.control('', {
				validators: [
					Validators.required
				]
			}),
			members: this._fb.array<string>([]) as FormArray<FormControl<string>>

		}) as FormGroup<FormType>;

		return form;
	}
}
