/**
 * Tournament constants
 * @constant
 */
export const TOURNAMENT_CONSTANTS = {

	get defaultNumberOfTeams(): number {

		return 2;
	},

	get availableNumberOfTeams(): number[] {

		return [
			2,
			4
		];
	}

}
