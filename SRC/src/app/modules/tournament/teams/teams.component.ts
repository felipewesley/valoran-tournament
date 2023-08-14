import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

import { MaterialModule } from "app/shared/modules/material";

import { Subject, filter, switchMap, takeUntil } from "rxjs";
import { DialogService } from "app/core/dialog";

import { TeamModel } from "app/domain/models/tournament/team/team.model";
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
export default class TournamentTeamsComponent implements OnInit, OnDestroy {

	// --------------------------------------------------
	// Properties
	// --------------------------------------------------

	public sidenavOpened: boolean = false;

	public teams: TeamModel[] = [];
	public numberOfTeams: number;

	// Unsubscription
	private _unsubscribeAll = new Subject<void>();

	/**
	 * Constructor
	 */
	constructor(
		private _service: TournamentTeamsService,
		private _dialogService: DialogService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute
	) { }

	ngOnInit(): void {

		this._service.teams$
			.pipe(
				takeUntil(this._unsubscribeAll)
			)
			.subscribe(teams => (this.teams = teams));

		this._service.tournamentNumberOfTeams$
			.pipe(
				takeUntil(this._unsubscribeAll)
			)
			.subscribe(numberOfTeams => (this.numberOfTeams = numberOfTeams));
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();
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

					return this._service.createTeam(model);
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
