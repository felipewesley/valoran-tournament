import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { MaterialModule } from "app/shared/modules/material";

@Component({
	selector: 'app-layout-default',
	templateUrl: './default.component.html',
	styleUrls: [],
	standalone: true,
	imports: [
		CommonModule,
		RouterOutlet,
		MaterialModule
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
