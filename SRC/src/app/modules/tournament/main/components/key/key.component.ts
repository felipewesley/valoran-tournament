import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { MaterialModule } from "app/shared/modules/material";
import { CustomPrintPipe } from "app/shared/pipes/custom-print";

import { TeamModel } from "app/domain/models/tournament/team/team.model";

import { TournamentMainLaneKeyModel } from "../../models/lane.model";

@Component({
	selector: 'app-tournament-main-key',
	templateUrl: './key.component.html',
	styleUrls: [],
	standalone: true,
	imports: [
		CommonModule,
		MaterialModule,
		CustomPrintPipe
	]
})
export class TournamentMainKeyComponent implements OnInit {

	// --------------------------------------------------
	// Data binding
	// --------------------------------------------------

	/**
	 * Key data
	 */
	@Input('data') public data: TournamentMainLaneKeyModel;

	/**
	 * All teams of the tournamet
	 */
	@Input('teams') public teams: TeamModel[];

	// --------------------------------------------------
	// Event binding
	// --------------------------------------------------

	/**
	 * Team selected event
	 * - Emits the id of team
	 */
	@Output('onTeamSelect') public onTeamSelect = new EventEmitter<string>();

	/**
	 * Constructor
	 */
	constructor() { }

	ngOnInit(): void {

	}
}
