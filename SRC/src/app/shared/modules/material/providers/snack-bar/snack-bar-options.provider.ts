import { Provider } from "@angular/core";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from "@angular/material/snack-bar";

/**
 *
 * @returns
 */
export function provideMatSnackBarOptions(): Provider[] {

	return [
		{
			provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
			useValue: <MatSnackBarConfig>{
				duration: 5000
			}
		}
	];
}
