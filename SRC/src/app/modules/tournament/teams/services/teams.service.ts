import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { CoreTournamentService } from "app/core/tournament";

import { TeamModel } from "app/domain/models/tournament/team/team.model";

@Injectable()
export class TournamentTeamsService {

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
	 * Getter - List of teams
	 */
	public get teams$(): Observable<TeamModel[]> {
		return this._tournamentService.teams$;
	}

	// --------------------------------------------------
	// Public methods
	// --------------------------------------------------

	/**
	 * Fetches a team from api
	 * @param teamId
	 * @returns
	 */
	public fetchTeamById(teamId: string): Observable<TeamModel> {

		return this._tournamentService.fetchTeamById(teamId);
	}
}
