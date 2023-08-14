import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";

import { AuthService } from "./auth.service";

/**
 * Route guard
 * @returns
 */
export function authGuard(): CanActivateFn {

	return () => {

		const authService = inject(AuthService);

		return authService.authenticated$;
	}
};
