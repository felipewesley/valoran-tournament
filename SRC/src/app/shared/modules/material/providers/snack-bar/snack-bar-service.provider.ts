import { Provider } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

/**
 *
 * @returns
 */
export function provideMatSnackBarService(): Provider[] {

	return [
		MatSnackBar
	];
};
