import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";

import { Subject, combineLatest, takeUntil } from "rxjs";

import { TeamModel } from "app/domain/models/tournament/team/team.model";

import { TournamentMainService } from "./services/main.service";
import { TournamentMainLaneModel } from "./models/lane.model";
import { TournamentMainKeyComponent } from "./components/key/key.component";

@Component({
	selector: 'app-tournament-main',
	templateUrl: './main.component.html',
	styleUrls: [],
	standalone: true,
	imports: [
		CommonModule,

		TournamentMainKeyComponent
	],
	providers: [
		TournamentMainService
	]
})
export default class TournamentMainComponent implements OnInit, OnDestroy {

	public lanes: TournamentMainLaneModel[] = [];

	public teams: TeamModel[] = [];

	// Unsubscription
	private _unsubscribeAll = new Subject<void>();

	/**
	 * Constructor
	 */
	constructor(
		private _service: TournamentMainService
	) { }

	ngOnInit(): void {

		combineLatest(
			[
				this._service.tournamentKeys$,
				this._service.teams$,
				this._service.numberOfTeams$
			])
			.pipe(
				takeUntil(this._unsubscribeAll)
			)
			.subscribe(([keys, teams, numberOfTeams]) => {

				this.lanes = this._service.generatesLanesToDisplay(keys, numberOfTeams);

				this.teams = teams;
			});
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();
	}
}
