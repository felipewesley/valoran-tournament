export type TournamentSetupDialogInput = {

	optionsWithNumberOfTeams: number[];
	initialValue?: {
		numberOfTeams: number;
	};

};

export type TournamentSetupDialogResult = {

	numberOfTeams: number;

};
