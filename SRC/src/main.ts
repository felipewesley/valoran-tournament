import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';

import { appRoutes } from './app/routes/app.routes';

/**
 * Providing root component and router
 */
bootstrapApplication(AppComponent, {
	providers: [
		provideRouter(appRoutes)
	]
});
