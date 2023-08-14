import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
	selector: 'app-tournament',
	templateUrl: './tournament.component.html',
	styleUrls: [],
	standalone: true,
	imports: [
		CommonModule
	]
})
export default class TournamentComponent implements OnInit {

	/**
	 * Constructor
	 */
	constructor() { }

	ngOnInit(): void {

	}
}
