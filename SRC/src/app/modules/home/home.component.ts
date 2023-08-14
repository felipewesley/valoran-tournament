import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

import { MaterialModule } from "app/shared/modules/material";

import { ActionTypeEnum } from "app/domain/enums/home/action-type.enum";
import { HomeActionListModel } from "app/domain/models/home/action-list.model";

import { HomeService } from "./services/home.service";
import { HomeActionItemComponent } from "./components/action-item/action-item.component";

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [],
	standalone: true,
	imports: [
		CommonModule,
		MaterialModule,

		HomeActionItemComponent
	],
	providers: [
		HomeService
	]
})
export default class HomeComponent implements OnInit {

	public actions$ = this._service.actions$;

	/**
	 * Constructor
	 */
	constructor(
		private _service: HomeService
	) { }

	ngOnInit(): void {

		this._service.fetchActions()
			.subscribe();
	}

	// --------------------------------------------------
	// Public methods
	// --------------------------------------------------

	/**
	 * "Track by" function used in the actions loop
	 * @param index
	 * @param item
	 * @returns
	 */
	public trackActionsFn(index: number, item: HomeActionListModel): ActionTypeEnum | number {
		return item.type | index;
	}
}
