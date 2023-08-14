import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "app/shared/modules/material";

import { NotificationService } from "app/core/notification";

import { TeamFormDialogFormService } from "./services/team-form.service";
import { TeamFormDialogInput, TeamFormDialogResult } from "./team-form.types";

@Component({
	selector: 'app-team-form-dialog',
	templateUrl: './team-form.component.html',
	styleUrls: [],
	standalone: true,
	imports: [
		CommonModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		TeamFormDialogFormService
	]
})
export class TeamFormDialogComponent implements OnInit {

	// --------------------------------------------------
	// Properties
	// --------------------------------------------------

	public readonly form = this._formService.form;
	public readonly membersForm = this._formService.membersForm;

	public readonly isEdition: boolean;

	/**
	 * Constructor
	 */
	constructor(
		private _formService: TeamFormDialogFormService,
		private _dialogRef: MatDialogRef<TeamFormDialogComponent, TeamFormDialogResult>,
		@Inject(MAT_DIALOG_DATA) data: TeamFormDialogInput,
		private _notificationService: NotificationService
	) {

		this.isEdition = !!data;

		if (data) {

			this._formService.patchValue({
				name: data.name,
				members: data.members
			});
		} else {

			// Creates a empty member field
			this._formService.addMember()
		}
	}

	ngOnInit(): void {

	}

	// --------------------------------------------------
	// Public methods
	// --------------------------------------------------

	/**
	 * Add a member
	 */
	public addMember(): void {
		this._formService.addMember();
	}

	/**
	 * Remove a member
	 * @param index
	 */
	public removeMember(index: number): void {
		this._formService.removeMember(index);
	}

	/**
	 * Save
	 */
	public save(): void {

		if (this.form.invalid) {

			this._notificationService.error('Formulário inválido!');

			return void 0;
		}

		const formValue = this._formService.getValue();

		const result: TeamFormDialogResult = {
			name: formValue.name,
			members: formValue.members
		};

		this._dialogRef.close(result);
	}
}
