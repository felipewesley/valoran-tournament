import { CommonModule } from "@angular/common";
import { Component, HostBinding, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
	selector: 'app-tournament',
	templateUrl: './tournament.component.html',
	styleUrls: [],
	standalone: true,
	imports: [
		CommonModule,
		RouterOutlet
	]
})
export default class TournamentComponent implements OnInit {

	@HostBinding('class') public readonly classes = ['min-h-full'];

	/**
	 * Constructor
	 */
	constructor() { }

	ngOnInit(): void {

	}
}
