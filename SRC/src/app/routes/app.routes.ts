import { Routes } from "@angular/router";

import { LayoutType } from "../layout/types/layout.type";
import LayoutComponent from "../layout/layout.component";

/**
 * Application main routes
 */
export const appRoutes: Routes = [

	/**
	 * Auth routes
	 */
	{
		path: '',
		// component: LayoutComponent,
		loadComponent: () => import('../layout/layout.component'),
		data: {
			teste: true,
			layout: <LayoutType>'empty'
		},
		children: [

			{
				path: 'sign-in',
				loadComponent: () => import('../modules/auth/sign-in/sign-in.component')
			}

		]
	}

];
