import { Provider } from "@angular/core";

import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldAppearance } from "@angular/material/form-field";

/**
 * Default appearance to `mat-form-field` components
 * @returns
 */
export function provideMatFormFieldDefaultAppearance(): Provider[] {

	return [
		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: {
				appearance: <MatFormFieldAppearance>'outline'
			}
		}
	]
};
