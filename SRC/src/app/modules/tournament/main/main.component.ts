import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
	selector: 'app-tournament-main',
	templateUrl: './main.component.html',
	styleUrls: [],
	standalone: true,
	imports: [
		CommonModule
	]
})
export default class TournamentMainComponent implements OnInit {

	/**
	 * Constructor
	 */
	constructor() { }

	ngOnInit(): void {

	}
}
