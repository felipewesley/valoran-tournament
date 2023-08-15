/**
 * ### Utils class
 * Application utils methods
 */
export abstract class Utils {

	/**
	 * Generates teams keys
	 * @param numberOfTeams
	 */
	static generateTeamsKeys(numberOfTeams: number): string[];
	/**
	 * Generates teams keys
	 * @param numberOfTeams
	 * @param start Default: `A`
	 */
	static generateTeamsKeys(numberOfTeams: number, start: string): string[];
	static generateTeamsKeys(numberOfTeams: number, start: string = 'A'): string[] {

		const keys = Array(numberOfTeams)
			.fill('')
			.map((_, i) => String.fromCharCode(start.charCodeAt(0) + i).toUpperCase());

		return keys;
	}

	/**
	 * Calculates the number of lanes to show in tournament view according by the number of teams
	 * @param numberOfTeams
	 * @param numberOfTeamsByKey
	 */
	static calcNumberOfLanes(numberOfTeams: number, numberOfTeamsByKey: number): number;
	static calcNumberOfLanes(numberOfTeams: number, numberOfTeamsByKey: number): number {

		type NumberOfTeamsCalcInitialValue = {

			result: number;
			numberOfLanes: number;

		};

		const calc = Array(numberOfTeams)
			.fill('')
			.reduce((prev: NumberOfTeamsCalcInitialValue, _) => {

				if (prev.result > 1) {

					prev.result = prev.result / numberOfTeamsByKey;
					prev.numberOfLanes++;
				}

				return prev;

			}, <NumberOfTeamsCalcInitialValue>{ result: numberOfTeams, numberOfLanes: 1 });

		return calc.numberOfLanes;
	}
}
