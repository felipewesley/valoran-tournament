import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, from, map, of, take } from 'rxjs';

import { CoreTournamentService } from 'app/core/tournament';

import { HOME_CONSTANTS } from 'app/domain/constants/home/home.constant';
import { HomeActionListModel } from 'app/domain/models/home/action-list.model';
import { AudioRecorder } from '@felipewb/audio-recorder/dist';

@Injectable()
export class HomeService {
	// --------------------------------------------------
	// Properties
	// --------------------------------------------------

	private _actions = new BehaviorSubject<HomeActionListModel[]>([]);

	private readonly _audio = new AudioRecorder();

	/**
	 * Constructor
	 */
	constructor(private _tournamentService: CoreTournamentService) {}

	// --------------------------------------------------
	// Accessors
	// --------------------------------------------------

	/**
	 * Getter - Home page actions
	 */
	public get actions$(): Observable<HomeActionListModel[]> {
		return this._actions.asObservable();
	}

	/**
	 * Getter - Number of teams
	 */
	public get numberOfTeams$(): Observable<number> {
		return this._tournamentService.numberOfTeams$;
	}

	// --------------------------------------------------
	// Public methods
	// --------------------------------------------------

	public start(): Observable<void> {
		const promise = this._audio.start();

		return from(promise);
	}

	public stop(): Observable<Blob> {
		const promise = this._audio.stop();

		return from(promise);
	}

	/**
	 * Fetch home page actions from api and updates the `actions$` observable
	 * @returns
	 */
	public fetchActions(): Observable<void> {
		return this._fetchActions().pipe(
			map((actions) => {
				this._actions.next(actions);

				return void 0;
			})
		);
	}

	/**
	 * Updates the number of teams
	 * @param numberOfTeams
	 */
	public updateNumberOfTeams(numberOfTeams: number): Observable<void> {
		return this._tournamentService.updatedNumberOfTeams(numberOfTeams);
	}

	// --------------------------------------------------
	// Private methods
	// --------------------------------------------------

	private _fetchActions(): Observable<HomeActionListModel[]> {
		const actions = HOME_CONSTANTS.actions;

		// return this._http.get<HomeActionListModel[]>(url)
		return of(actions).pipe(take(1));
	}
}
