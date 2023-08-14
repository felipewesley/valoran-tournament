import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { MaterialModule } from "app/shared/modules/material";

import { TournamentSetupDialogFormService } from "./services/tournament-setup-form.service";
import { TournamentSetupDialogInput, TournamentSetupDialogResult } from "./tournament-setup.types";

@Component({
	selector: 'app-tournament-setup-dialog',
	templateUrl: './tournament-setup.component.html',
	styleUrls: [],
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule
	],
	providers: [
		TournamentSetupDialogFormService
	]
})
export class TournamentSetupDialogComponent implements OnInit {

	// --------------------------------------------------
	// Properties
	// --------------------------------------------------

	public readonly form = this._formService.form;

	public readonly options: number[] = [];

	/**
	 * Constructor
	 */
	constructor(
		private _formService: TournamentSetupDialogFormService,
		@Inject(MAT_DIALOG_DATA) data: TournamentSetupDialogInput,
		private _dialogRef: MatDialogRef<TournamentSetupDialogComponent, TournamentSetupDialogResult>
	) {
		const { optionsWithNumberOfTeams, initialValue } = data;

		this.options = optionsWithNumberOfTeams ?? [];

		if (initialValue) {

			this._formService.patchValue({
				numberOfTeams: initialValue.numberOfTeams
			});
		}
	}

	ngOnInit(): void {

	}

	// --------------------------------------------------
	// Public methods
	// --------------------------------------------------

	/**
	 * Save the operation
	 */
	public save(): void {

		const formValue = this._formService.getValue();

		const result: TournamentSetupDialogResult = {
			numberOfTeams: formValue.numberOfTeams
		};

		this._dialogRef.close(result);
	}
}
