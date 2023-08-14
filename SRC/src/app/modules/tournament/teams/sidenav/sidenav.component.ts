import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, OnDestroy, OnInit, Optional } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

import { MaterialModule } from "app/shared/modules/material";

import { Subject, filter, switchMap, takeUntil } from "rxjs";
import { DialogService } from "app/core/dialog";
import { NotificationService } from "app/core/notification";

import { TeamModel } from "app/domain/models/tournament/team/team.model";

import TournamentTeamsComponent from "../teams.component";
import { TournamentTeamsService } from "../services/teams.service";

@Component({
	selector: 'app-tournament-teams-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: [],
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		MaterialModule,
	]
})
export default class TournamentTeamsSidenavComponent implements OnInit, AfterViewInit, OnDestroy {

	// --------------------------------------------------
	// Properties
	// --------------------------------------------------

	public team?: TeamModel;

	// Unsubscription
	private _unsubscribeAll = new Subject<void>();

	/**
	 * Constructor
	 */
	constructor(
		@Optional() private _teamsContainerComponent: TournamentTeamsComponent,
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _teamService: TournamentTeamsService,
		private _dialogService: DialogService,
		private _notificationService: NotificationService
	) { }

	ngOnInit(): void {

		this._activatedRoute.params
			.pipe(
				switchMap(params => {

					const teamId = params['teamId'] as string;

					return this._teamService.fetchTeamById(teamId);
				}),
				takeUntil(this._unsubscribeAll)
			)
			.subscribe(team => {

				if (!team) {
					this._router
						.navigate(['..'], {
							relativeTo: this._activatedRoute
						});

					return;
				}

				// Open the sidebar
				setTimeout(() => this._teamsContainerComponent.openSidenav());

				this.team = team;
			});
	}

	ngAfterViewInit(): void {

	}

	ngOnDestroy(): void {

		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();

		// Close the sidebar
		this._teamsContainerComponent.closeSidenav();
	}

	// --------------------------------------------------
	// Public methods
	// --------------------------------------------------

	/**
	 * Remove the team
	 */
	public removeTeam(): void {

		const teamId = this.team?.teamId!;

		this._dialogService.confirm(`Realmente deseja remover esta equipe do torneio?`)
			.pipe(
				filter(res => res),
				switchMap(() => this._teamService.removeTeam(teamId))
			)
			.subscribe(() => {

				this._notificationService.message('Equipe removida do torneio');

				this._router
					.navigate(['..'], {
						relativeTo: this._activatedRoute
					});
			});
	}
}

