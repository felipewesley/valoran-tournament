import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "app/shared/modules/material";

import { Subject, filter, startWith, switchMap, takeUntil } from "rxjs";
import { DialogService } from "app/core/dialog";
import { NotificationService } from "app/core/notification";

import { TeamModel } from "app/domain/models/tournament/team/team.model";
import { TournamentKeyModel } from "app/domain/models/tournament/key/key.model";

import { TournamentKeysService } from "./services/keys.service";
import { TournamentKeysFormService } from "./services/keys-form.service";

@Component({
	selector: 'app-tournament-keys',
	templateUrl: './keys.component.html',
	styleUrls: [],
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule
	],
	providers: [
		TournamentKeysService,
		TournamentKeysFormService
	]
})
export default class TournamentKeysComponent implements OnInit, OnDestroy {

	public readonly form = this._formService.form;
	public readonly formKeys = this._formService.formKeys;

	public definedTeamsIds: { [key: string]: true } = {};

	public teams: TeamModel[] = [];
	public numberOfTeams: number;

	// Unsubscription
	private _unsubscribeAll = new Subject<void>();

	/**
	 * Constructor
	 */
	constructor(
		private _service: TournamentKeysService,
		private _formService: TournamentKeysFormService,
		private _dialogService: DialogService,
		private _notificationService: NotificationService,
		private _router: Router
	) { }

	ngOnInit(): void {

		this._service.tournamentKeys$
			.pipe(
				takeUntil(this._unsubscribeAll)
			)
			.subscribe(keys => {

				this._formService.patchValue({
					keys: keys.map(e => ({
						key: e.key,
						team1: e.team1,
						team2: e.team2
					}))
				});
			});

		this.formKeys.valueChanges
			.pipe(
				startWith(this.formKeys.value),
				takeUntil(this._unsubscribeAll)
			)
			.subscribe(value => {

				const definedTeamsIds = value
					.reduce((prev, cur) => {

						if (cur.team1)
							prev[cur.team1] = true;

						if (cur.team2)
							prev[cur.team2] = true;

						return prev;

					}, {} as typeof this.definedTeamsIds);

				this.definedTeamsIds = definedTeamsIds;
			});

		this._service.teams$
			.pipe(
				takeUntil(this._unsubscribeAll)
			)
			.subscribe(teams => (this.teams = teams));

		this._service.numberOfTeams$
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
	 * Clear team control value
	 * @param team
	 * @param index
	 */
	public clearTeamControl(team: string, index: number): void {
		this._formService.clearTeamControl(index, team);
	}

	/**
	 * Save action callback
	 */
	public save(): void {

		this._dialogService.confirm('Deseja salvar as alterações realizadas?')
			.pipe(
				filter(res => res),
				switchMap(() => {

					const formValue = this._formService.getValue();

					const keys: TournamentKeyModel[] = formValue
						.keys
						.map(e => ({
							key: e.key,
							team1: e.team1,
							team2: e.team2
						}));

					return this._service.updateKeys(keys);
				})
			)
			.subscribe(() => {

				this._notificationService.message('Alterações salvas com sucesso');

				// Navigate to home
				this._router.navigate(['/home']);
			});
	}
}
