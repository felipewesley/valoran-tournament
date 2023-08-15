import { Injectable } from "@angular/core";

import { Observable, map } from "rxjs";
import { Utils } from "app/core/utils/utils";
import { CoreTournamentService } from "app/core/tournament";

import { TeamModel } from "app/domain/models/tournament/team/team.model";
import { TournamentKeyModel } from "app/domain/models/tournament/key/key.model";
import { TOURNAMENT_CONSTANTS } from "app/domain/constants/tournament/tournament.constant";

import { TournamentMainLaneKeyModel, TournamentMainLaneModel } from "../models/lane.model";

@Injectable()
export class TournamentMainService {

	/**
	 * Constructor
	 */
	constructor(
		private _tournamentService: CoreTournamentService
	) { }

	// --------------------------------------------------
	// Public methods
	// --------------------------------------------------

	public get tournamentKeys$(): Observable<TournamentKeyModel[]> {
		return this._tournamentService.tournamentKeys$;
	}

	public get teams$(): Observable<TeamModel[]> {
		return this._tournamentService.teams$;
	}

	public get numberOfTeams$(): Observable<number> {
		return this._tournamentService.numberOfTeams$;
	}

	/**
	 * Gets the number of lanes to show in the tournament main view
	 * @returns
	 */
	public getNumberOfLanes(): Observable<number> {

		return this._tournamentService.numberOfTeams$
			.pipe(
				map(numberOfTeams => Utils.calcNumberOfLanes(numberOfTeams, TOURNAMENT_CONSTANTS.numberOfMembersByTeam))
			);
	}

	generatesLanesToDisplay(keys: TournamentKeyModel[], numberOfTeams: number): TournamentMainLaneModel[] {

		const lanes: TournamentMainLaneModel[] = [];

		const numberOfLanes: number = Utils.calcNumberOfLanes(numberOfTeams, TOURNAMENT_CONSTANTS.numberOfMembersByTeam);

		for (let index = (numberOfLanes); index >= 1; index--) {

			/**
			 * Winner
			 */
			if (index == (numberOfLanes)) {

				lanes.push({
					laneName: 'Resultado',
					keys: [
						{
							keyName: 'Vencedor',
							isResultKey: true
						}
					]
				});

				continue;
			}

			/**
			 * "Final" lane must have a diferent name
			 */
			if (index == (numberOfLanes - 1)) {

				const laneName = keys.length == 1 ? 'Disputa de grupos' : 'Final';
				const keyName = keys.length == 1 ? 'Chave principal' : 'Finalistas';

				lanes.push({
					laneName: laneName,
					keys: [
						{
							keyName: keyName,
							isResultKey: false
						}
					]
				});

				continue;
			}

			/**
			 * First lane was added manually
			 */
			if (index == 1) {

				const firstLane: TournamentMainLaneModel = {
					laneName: 'Fase de grupos',
					keys: keys.map(k => ({
						keyName: k.key,
						team1: k.team1,
						team2: k.team2,
						isResultKey: false
					}))
				};

				lanes.push(firstLane);

				continue;

			} else {

				const numberOfKeys = lanes.at(-1).keys.length * 2;

				lanes.push({
					laneName: `Rodada ${index}`,
					keys: Array(numberOfKeys).fill(<TournamentMainLaneKeyModel>{
						isResultKey: false
					})
				});

			}

		}

		return lanes.reverse();
	}
}
