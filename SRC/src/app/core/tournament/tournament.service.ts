import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable, of, take, tap } from "rxjs";

import { Guid } from "app/common/types/guid";

import { TeamModel } from "app/domain/models/tournament/team/team.model";
import { TeamCreationModel } from "app/domain/models/tournament/team/team-creation.model";

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

	private _teams = new BehaviorSubject<TeamModel[]>([{} as TeamModel, {} as TeamModel, {} as TeamModel]);

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

	// --------------------------------------------------
	// Public methods
	// --------------------------------------------------

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

	private _createTeam(model: TeamCreationModel): Observable<string> {

		const teamId = Guid.newGuid().toString();

		// return this._http.post<string>(url, model)
		return of(teamId)
			.pipe(
				take(1)
			);
	}
}
