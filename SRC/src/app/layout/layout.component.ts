import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Subject, map, takeUntil } from "rxjs";

import { LayoutType } from "./types/layout.type";

import { LayoutEmptyComponent } from "./layouts/empty/empty.component";
import { LayoutDefaultComponent } from "./layouts/default/default.component";

/**
 * Application default layout
 */
const defaultLayout: LayoutType = 'empty';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: [],
	standalone: true,
	imports: [
		CommonModule,

		LayoutEmptyComponent,
		LayoutDefaultComponent
	]
})
export default class LayoutComponent implements OnInit, OnDestroy {

	public layout: LayoutType = defaultLayout;

	// Unsubscription
	private _unsubscribeAll = new Subject<void>();

	/**
	 * Constructor
	 */
	constructor(
		private _activatedRoute: ActivatedRoute
	) { }

	ngOnInit(): void {

		this._activatedRoute.data
			.pipe(
				map(data => {

					const layout = <LayoutType>data['layout'] ?? null;

					return layout;
				}),
				takeUntil(this._unsubscribeAll)
			)
			.subscribe(layout => {

				if (!layout)
					throw new Error('Invalid layout type at LayoutComponent - A valid layout type must be provided in route data!');

				this.layout = layout;
			});
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();
	}
}
