import { Routes } from "@angular/router";

export const appRoutes: Routes = [

	{
		path: 'sign-in',
		loadComponent: () => import('../modules/auth/sign-in/sign-in.component')
	}

];
