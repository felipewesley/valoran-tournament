import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable, map, of, take, tap } from "rxjs";

import { Guid } from "app/common/types/guid";
import { Utils } from "../utils/utils";

import { TeamModel } from "app/domain/models/tournament/team/team.model";
import { TeamCreationModel } from "app/domain/models/tournament/team/team-creation.model";
import { TournamentKeyModel } from "app/domain/models/tournament/key/key.model";
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

	private _numberOfTeams = new BehaviorSubject<number>(null);

	private _teams = new BehaviorSubject<TeamModel[]>([]);

	private _keys = new BehaviorSubject<TournamentKeyModel[]>([]);

	/**
	 * Constructor
	 */
	constructor() {

		// Init the default number of teams
		this.updatedNumberOfTeams(TOURNAMENT_CONSTANTS.defaultNumberOfTeams)
			.subscribe();
	}

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

	/**
	 * Getter - Number of keys of the tournament
	 */
	public get numberOfKeys$(): Observable<number> {

		return this._numberOfTeams.asObservable()
			.pipe(
				map(numberOfTeams => {

					return Math.round(numberOfTeams / TOURNAMENT_CONSTANTS.numberOfMembersByTeam);
				})
			);
	}

	/**
	 * Getter - Tournament keys
	 */
	public get tournamentKeys$(): Observable<TournamentKeyModel[]> {

		return this._keys.asObservable();
	}

	// --------------------------------------------------
	// Public methods
	// --------------------------------------------------

	/**
	 * Updates the mapping of teams by key
	 * @param teamsByKey
	 * @returns
	 */
	public updateKeys(keys: TournamentKeyModel[]): Observable<void> {

		return this._updateKeys(keys)
			.pipe(
				tap(() => {

					this._keys.next(keys);
				})
			);
	}

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

					const numberOfKeys = numberOfTeams / 2;

					// Update the keys
					const newKeys: TournamentKeyModel[] = Utils
						.generateTeamsKeys(numberOfKeys)
						.map(key => ({
							key: key,
							team1: null,
							team2: null
						}));

					this._keys.next(newKeys);
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

		/**
		 * Back-end validation
		 */
		if (numberOfTeams < this._teams.getValue().length)
			throw new Error('Não é possível diminuir a quantidade de equipes pois já há mais equipes cadastradas.');

		// return this._http.put<void>(url, numberOfTeams)
		return of(void 0)
			.pipe(
				take(1)
			);
	}

	private _updateKeys(keys: TournamentKeyModel[]): Observable<void> {

		// return this._http.put<void>(url, teamsByKey)
		return of(void 0)
			.pipe(
				take(1)
			);
	}
}
