import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

import { MaterialModule } from "app/shared/modules/material";

import { filter, switchMap } from "rxjs";
import { DialogService } from "app/core/dialog";
import { CoreTournamentService } from "app/core/tournament";

import { TeamCreationModel } from "app/domain/models/tournament/team/team-creation.model";

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
		private _tournamentService: CoreTournamentService,
		private _service: TournamentTeamsService,
		private _dialogService: DialogService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute
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

	/**
	 * Add a new team action
	 */
	public addTeam(): void {

		this._dialogService
			.teamForm()
			.pipe(
				filter(res => !!res),
				switchMap(res => {

					const model: TeamCreationModel = {
						name: res.name,
						members: res.members
					};

					return this._tournamentService.createTeam(model);
				})
			)
			.subscribe(teamId => {

				// Open the team details
				this._router
					.navigate([teamId], {
						relativeTo: this._activatedRoute
					});
			});
	}
}
