import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";

import { TeamModel } from "app/domain/models/tournament/team/team.model";

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


}
