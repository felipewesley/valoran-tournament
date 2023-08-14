/**
 * @interface
 */
export interface TeamModel {
	teamId: string;
	name: string;
	creationDateTime: Date;
	members: string[];
	totalScore: number;
}
