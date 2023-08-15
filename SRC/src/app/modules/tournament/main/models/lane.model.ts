/**
 * @interface
 */
export interface TournamentMainLaneModel {

	laneName: string;
	keys: TournamentMainLaneKeyModel[];

}

/**
 * @interface
 */
export interface TournamentMainLaneKeyModel {

	keyName?: string;

	isResultKey: boolean;

	team1?: string;
	team2?: string;
	winner?: string;

}
