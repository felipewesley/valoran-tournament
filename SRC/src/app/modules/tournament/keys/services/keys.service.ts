import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { CoreTournamentService } from "app/core/tournament";

import { TeamModel } from "app/domain/models/tournament/team/team.model";
import { TournamentKeyModel } from "app/domain/models/tournament/key/key.model";

@Injectable()
export class TournamentKeysService {

	// --------------------------------------------------
	// Properties
	// --------------------------------------------------

	/**
	 * Constructor
	 */
	constructor(
		private _tournamentService: CoreTournamentService
	) { }

	// --------------------------------------------------
	// Accessors
	// --------------------------------------------------

	/**
	 * Getter - Number of keys
	 */
	public get numberOfKeys$(): Observable<number> {
		return this._tournamentService.numberOfKeys$;
	}

	/**
	 * Getter - Number of teams
	 */
	public get numberOfTeams$(): Observable<number> {
		return this._tournamentService.numberOfTeams$;
	}

	/**
	 * Getter - Tournament keys
	 */
	public get tournamentKeys$(): Observable<TournamentKeyModel[]> {
		return this._tournamentService.tournamentKeys$;
	}

	/**
	 * Getter - Teams
	 */
	public get teams$(): Observable<TeamModel[]> {
		return this._tournamentService.teams$;
	}

	// --------------------------------------------------
	// Public methods
	// --------------------------------------------------

	/**
	 *
	 * @param keys
	 * @returns
	 */
	public updateKeys(keys: TournamentKeyModel[]): Observable<void> {

		return this._tournamentService.updateKeys(keys);
	}

}
