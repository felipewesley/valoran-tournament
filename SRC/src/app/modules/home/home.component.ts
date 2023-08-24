import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { MaterialModule } from 'app/shared/modules/material';

import { Subject, filter, switchMap, takeUntil } from 'rxjs';
import { DialogService } from 'app/core/dialog';
import { NotificationService } from 'app/core/notification';

import { ActionTypeEnum } from 'app/domain/enums/home/action-type.enum';
import { HomeActionListModel } from 'app/domain/models/home/action-list.model';
import { TOURNAMENT_CONSTANTS } from 'app/domain/constants/tournament/tournament.constant';

import { HomeService } from './services/home.service';
import { HomeActionItemComponent } from './components/action-item/action-item.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [],
	standalone: true,
	imports: [CommonModule, MaterialModule, HomeActionItemComponent],
	providers: [HomeService],
})
export default class HomeComponent implements OnInit, OnDestroy {
	public actions$ = this._service.actions$;

	private _numberOfTeams: number;

	public audioSrc?: string;

	// Unsubscription
	private _unsubscribeAll = new Subject<void>();

	/**
	 * Constructor
	 */
	constructor(
		private _service: HomeService,
		private _dialogService: DialogService,
		private _notificationService: NotificationService
	) {}

	ngOnInit(): void {
		this._service.fetchActions().subscribe();

		this._service.numberOfTeams$
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe(
				(numberOfTeams) => (this._numberOfTeams = numberOfTeams)
			);
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();
	}

	// --------------------------------------------------
	// Public methods
	// --------------------------------------------------

	start(): void {
		this._service.start().subscribe();
	}

	stop(): void {
		this._service.stop().subscribe((blob) => {
			const file = new File([blob], 'arquivo.webm', {
				type: 'audio/webm',
			});

			this.audioSrc = URL.createObjectURL(file);
		});
	}

	/**
	 * Action clicked - Callback
	 * @param action
	 */
	public actionClicked(action: ActionTypeEnum): void {
		switch (action) {
			case ActionTypeEnum.GoToTournament:
				break;

			case ActionTypeEnum.ManageKeys:
				break;

			case ActionTypeEnum.ManageTeams:
				break;

			case ActionTypeEnum.SetupTournament:
				this._tournamentSetup();
				break;
		}
	}

	/**
	 * "Track by" function used in the actions loop
	 * @param index
	 * @param item
	 * @returns
	 */
	public trackActionsFn(
		index: number,
		item: HomeActionListModel
	): ActionTypeEnum | number {
		return item.type | index;
	}

	// --------------------------------------------------
	// Private methods
	// --------------------------------------------------

	/**
	 * Setup the tournament
	 */
	private _tournamentSetup(): void {
		const options = TOURNAMENT_CONSTANTS.availableNumberOfTeams;

		this._dialogService
			.tournamentSetup({
				optionsWithNumberOfTeams: options,
				initialValue: {
					numberOfTeams: this._numberOfTeams,
				},
			})
			.pipe(
				filter((res) => res != null),
				switchMap((res) => {
					return this._dialogService
						.confirm(
							'Realmente deseja atualizar a quantidade de equipes do torneio?'
						)
						.pipe(
							filter((res) => res),
							switchMap(() =>
								this._service.updateNumberOfTeams(
									res.numberOfTeams
								)
							)
						);
				})
			)
			.subscribe(() => {
				// Show notification
				this._notificationService.message(
					'A quantidade de equipes foi atualizada'
				);
			});
	}
}
