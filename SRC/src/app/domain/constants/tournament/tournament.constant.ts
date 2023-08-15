/**
 * Tournament constants
 * @constant
 */
export const TOURNAMENT_CONSTANTS = {

	get numberOfMembersByTeam(): number {

		return 2;
	},

	get defaultNumberOfTeams(): number {

		return 8;
	},

	get availableNumberOfTeams(): number[] {

		return [
			2,
			4,
			8,
			16
		];
	}

}
