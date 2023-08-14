import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

import { MaterialModule } from "app/shared/modules/material";

import { DialogService } from "app/core/dialog";

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
		private _service: HomeService,
		private _dialogService: DialogService
	) { }

	ngOnInit(): void {

		this._service.fetchActions()
			.subscribe();
	}

	// --------------------------------------------------
	// Public methods
	// --------------------------------------------------

	/**
	 * Action clicked - Callback
	 * @param action
	 */
	public actionClicked(action: ActionTypeEnum): void {

		switch(action) {

			case ActionTypeEnum.GoToTournament:
				break;

			case ActionTypeEnum.ManageKeys:
				break;

			case ActionTypeEnum.ManageTeams:
				break;

			case ActionTypeEnum.SetupTournament:
				this._tournamentSetup();
				break;
		}
	}

	/**
	 * "Track by" function used in the actions loop
	 * @param index
	 * @param item
	 * @returns
	 */
	public trackActionsFn(index: number, item: HomeActionListModel): ActionTypeEnum | number {
		return item.type | index;
	}

	// --------------------------------------------------
	// Private methods
	// --------------------------------------------------

	/**
	 * Setup the tournament
	 */
	private _tournamentSetup(): void {

		this._dialogService.tournamentSetup();
	}
}
