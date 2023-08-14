import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
	selector: 'app-layout-default',
	templateUrl: './default.component.html',
	styleUrls: [],
	standalone: true,
	imports: [
		CommonModule,
		RouterOutlet
	]
})
export class LayoutDefaultComponent implements OnInit {

	/**
	 * Constructor
	 */
	constructor() { }

	ngOnInit(): void {

	}
}
