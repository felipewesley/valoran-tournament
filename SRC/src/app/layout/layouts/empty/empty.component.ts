import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
	selector: 'app-layout-empty',
	templateUrl: './empty.component.html',
	styleUrls: [],
	standalone: true,
	imports: [
		RouterOutlet
	]
})
export class LayoutEmptyComponent implements OnInit {

	/**
	 * Constructor
	 */
	constructor() { }

	ngOnInit(): void {

	}
}
