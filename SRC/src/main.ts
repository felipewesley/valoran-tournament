import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';

import { appRoutes } from './app/routes/app.routes';

import { provideMatFormFieldDefaultAppearance } from 'app/shared/modules/material/providers/form-field';
import { provideMatSnackBarOptions, provideMatSnackBarService } from 'app/shared/modules/material/providers/snack-bar';

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

		// --------------------------------------------------
		// Material providers
		// --------------------------------------------------

		/**
		 * Form field
		 */
		provideMatFormFieldDefaultAppearance(),

		/**
		 * Snack bar
		 */
		provideMatSnackBarService(),
		provideMatSnackBarOptions()
	]
});
