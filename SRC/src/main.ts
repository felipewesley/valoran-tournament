import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';

import { appRoutes } from './app/routes/app.routes';

import { provideMatFormFieldDefaultAppearance } from 'app/shared/modules/material/providers/form-field';

/**
 * Providing root component and router
 */
bootstrapApplication(AppComponent, {
	providers: [

		/**
		 * Root navigation
		 */
		provideRouter(appRoutes),

		/**
		 * Browser animation dependencies
		 */
		provideAnimations(),

		/**
		 * Material providers
		 */
		provideMatFormFieldDefaultAppearance()
	]
});
