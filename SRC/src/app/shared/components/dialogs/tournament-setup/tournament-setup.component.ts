import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

import { MaterialModule } from "app/shared/modules/material";

import { TournamentSetupDialogFormService } from "./services/tournament-setup-form.service";

@Component({
	selector: 'app-tournament-setup-dialog',
	templateUrl: './tournament-setup.component.html',
	styleUrls: [],
	standalone: true,
	imports: [
		CommonModule,
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

	/**
	 * Constructor
	 */
	constructor(
		private _formService: TournamentSetupDialogFormService
	) { }

	ngOnInit(): void {

	}
}
