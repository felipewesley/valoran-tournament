import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable, of, take, tap } from "rxjs";

import { Guid } from "app/common/types/guid";
import { IKeyValuePair } from "app/common/types/key-value-pair";

import { TeamModel } from "app/domain/models/tournament/team/team.model";
import { TeamCreationModel } from "app/domain/models/tournament/team/team-creation.model";
import { TOURNAMENT_CONSTANTS } from "app/domain/constants/tournament/tournament.constant";

/**
 * ### Tournament service (`core`)
 */
@Injectable({
	providedIn: 'root'
})
export class CoreTournamentService {

	// --------------------------------------------------
	// Properties
	// --------------------------------------------------

	private _numberOfTeams = new BehaviorSubject<number>(TOURNAMENT_CONSTANTS.defaultNumberOfTeams);

	private _teams = new BehaviorSubject<TeamModel[]>([]);

	private _teamsByKey = new BehaviorSubject<IKeyValuePair<string, string[]>[]>([]);


	/**
	 * Constructor
	 */
	constructor() { }

	// --------------------------------------------------
	// Accessors
	// --------------------------------------------------

	/**
	 * Getter - List of tournament teams
	 */
	public get teams$(): Observable<TeamModel[]> {

		return this._teams.asObservable();
	}

	/**
	 * Getter - Number of teams
	 */
	public get numberOfTeams$(): Observable<number> {

		return this._numberOfTeams.asObservable();
	}

	// --------------------------------------------------
	// Public methods
	// --------------------------------------------------

	/**
	 * Updates the number of accepted teams in the tournament
	 * @param numberOfTeams
	 * @returns
	 */
	public updatedNumberOfTeams(numberOfTeams: number): Observable<void> {

		return this._updateNumberOfTeams(numberOfTeams)
			.pipe(
				tap(() => {

					this._numberOfTeams.next(numberOfTeams);
				})
			);
	}

	/**
	 * Fetches a team from api by id
	 * @param teamId
	 * @returns
	 */
	public fetchTeamById(teamId: string): Observable<TeamModel> {

		return this._fetchTeamById(teamId);
	}

	/**
	 * Removes a team from the tournament
	 * @param teamId
	 * @returns
	 */
	public removeTeam(teamId: string): Observable<void> {

		return this._removeTeam(teamId)
			.pipe(
				tap(() => {

					const teams = this._teams
						.getValue()
						.filter(t => t.teamId != teamId);

					// Update the teams list
					this._teams.next(teams);
				})
			);
	}

	/**
	 * Creates the team in the api and returns its id
	 * @returns
	 */
	public createTeam(model: TeamCreationModel): Observable<string> {

		return this._createTeam(model)
			.pipe(
				tap(teamId => {

					const team: TeamModel = {
						teamId: teamId,
						name: model.name,
						creationDateTime: new Date(),
						members: model.members,
						totalScore: 0
					};

					const teamsList = this._teams.getValue().slice();
					teamsList.push(team);

					// Updates current teams
					this._teams.next(teamsList);
				})
			);
	}

	// --------------------------------------------------
	// Private methods
	// --------------------------------------------------

	private _fetchTeamById(teamId: string): Observable<TeamModel> {

		const team = this._teams
			.getValue()
			.slice()
			.find(t => t.teamId == teamId);

		// return this._http.get<TeamModel>(url)
		return of(team!)
			.pipe(
				take(1)
			);
	}

	private _createTeam(model: TeamCreationModel): Observable<string> {

		const teamId = Guid.newGuid().toString();

		// return this._http.post<string>(url, model)
		return of(teamId)
			.pipe(
				take(1)
			);
	}

	private _removeTeam(teamId: string): Observable<void> {

		// return this._http.delete<void>(url)
		return of(void 0)
			.pipe(
				take(1)
			);
	}

	private _updateNumberOfTeams(numberOfTeams: number): Observable<void> {

		// return this._http.put<void>(url, numberOfTeams)
		return of(void 0)
			.pipe(
				take(1)
			);
	}
}
