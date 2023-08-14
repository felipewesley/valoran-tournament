import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { CoreTournamentService } from "app/core/tournament";

import { TeamModel } from "app/domain/models/tournament/team/team.model";
import { TeamCreationModel } from "app/domain/models/tournament/team/team-creation.model";

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

	/**
	 * Getter - Number of teams
	 */
	public get tournamentNumberOfTeams$(): Observable<number> {
		return this._tournamentService.numberOfTeams$;
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

	/**
	 * Removes a team from the tournament
	 * @param teamId
	 * @returns
	 */
	public removeTeam(teamId: string): Observable<void> {

		return this._tournamentService.removeTeam(teamId);
	}

	/**
	 * Creates a team
	 * @param model
	 * @returns
	 */
	public createTeam(model: TeamCreationModel): Observable<string> {

		return this._tournamentService.createTeam(model);
	}
}
