import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "app/shared/modules/material";

import { TournamentTeamsService } from "./services/teams.service";

@Component({
	selector: 'app-tournament-teams',
	templateUrl: './teams.component.html',
	styleUrls: [],
	standalone: true,
	imports: [
		CommonModule,
		MaterialModule,
		RouterModule
	],
	providers: [
		TournamentTeamsService
	]
})
export default class TournamentTeamsComponent implements OnInit {

	// --------------------------------------------------
	// Properties
	// --------------------------------------------------

	public sidenavOpened: boolean = false;

	public teams$ = this._service.teams$;

	/**
	 * Constructor
	 */
	constructor(
		private _service: TournamentTeamsService
	) { }

	ngOnInit(): void {

	}

	// --------------------------------------------------
	// Public methods
	// --------------------------------------------------

	/**
	 * Sets the `opened` flag to `true`
	 */
	public openSidenav(): void {
		this.sidenavOpened = true;
	}

	/**
	 * Sets the `opened` flag to `false`
	 */
	public closeSidenav(): void {
		this.sidenavOpened = false;
	}
}
