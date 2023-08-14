import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "app/shared/modules/material";

import { ActionTypeEnum } from "app/domain/enums/home/action-type.enum";
import { HomeActionListModel } from "app/domain/models/home/action-list.model";

@Component({
	selector: 'app-home-action-item',
	templateUrl: './action-item.component.html',
	styleUrls: [],
	standalone: true,
	imports: [
		CommonModule,
		MaterialModule,
		RouterModule
	]
})
export class HomeActionItemComponent implements OnInit {

	// --------------------------------------------------
	// Data binding
	// --------------------------------------------------

	/**
	 * Action item data
	 */
	@Input('action') public action!: HomeActionListModel;

	// --------------------------------------------------
	// Event binding
	// --------------------------------------------------

	/**
	 * Action clicked event
	 */
	@Output('onActionClick') public onActionClick = new EventEmitter<ActionTypeEnum>();

	/**
	 * Constructor
	 */
	constructor() { }

	ngOnInit(): void {

	}

	// --------------------------------------------------
	// Public methods
	// --------------------------------------------------

	/**
	 * Action clicked callback
	 */
	public actionClicked(): void {

		if (this.action.url)
			return void 0;

		const action = this.action.type;

		this.onActionClick.emit(action);
	}
}
