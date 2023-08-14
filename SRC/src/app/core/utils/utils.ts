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
}
