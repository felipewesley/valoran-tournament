import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, OnDestroy, OnInit, Optional } from "@angular/core";

import TournamentTeamsComponent from "../teams.component";

@Component({
	selector: 'app-tournament-teams-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: [],
	standalone: true,
	imports: [
		CommonModule
	]
})
export default class TournamentTeamsSidenavComponent implements OnInit, AfterViewInit, OnDestroy {

	/**
	 * Constructor
	 */
	constructor(
		@Optional() private _teamsContainerComponent: TournamentTeamsComponent
	) { }

	ngOnInit(): void {

	}

	ngAfterViewInit(): void {

		// Open the sidebar
		setTimeout(() => this._teamsContainerComponent.openSidenav());
	}

	ngOnDestroy(): void {

		// Close the sidebar
		this._teamsContainerComponent.closeSidenav();
	}
}
