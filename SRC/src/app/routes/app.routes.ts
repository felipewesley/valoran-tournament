import { Routes } from "@angular/router";

import { LayoutType } from "../layout/types/layout.type";

/**
 * Application main routes
 */
export const appRoutes: Routes = [

	/**
	 * Redirects
	 */
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'home'
	},

	/**
	 * Auth routes
	 */
	{
		path: '',
		loadComponent: () => import('../layout/layout.component'),
		data: {
			layout: <LayoutType>'empty'
		},
		children: [

			{
				path: 'sign-in',
				loadComponent: () => import('../modules/auth/sign-in/sign-in.component')
			}

		]
	},

	/**
	 * Application routes
	 */
	{
		path: '',
		loadComponent: () => import('../layout/layout.component'),
		data: {
			layout: <LayoutType>'default'
		},
		children: [

			{
				path: 'home',
				loadComponent: () => import('../modules/home/home.component')
			},
			{
				path: 'tournament',
				loadComponent: () => import('../modules/tournament/tournament.component'),
				children: [

					{
						path: 'teams',
						loadComponent: () => import('../modules/tournament/teams/teams.component'),
						children: [

							{
								path: ':teamId',
								loadComponent: () => import('../modules/tournament/teams/sidenav/sidenav.component')
							}

						]
					}

				]
			}

		]
	}

];
