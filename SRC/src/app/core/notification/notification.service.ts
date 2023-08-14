import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

/**
 * ### App notification service
 * Shows a simple notification in the screen
 */
@Injectable({
	providedIn: 'root'
})
export class NotificationService {

	/**
	 * Constructor
	 */
	constructor(
		private _snackBar: MatSnackBar
	) { }

	/**
	 * Displays a message
	 * @param message
	 */
	public message(message: string): void {

		this._snackBar.open(message, undefined, {
			panelClass: [
				'notification-message'
			]
		});
	}

	/**
	 * Displays a error message
	 * @param message
	 */
	public error(message: string): void {

		this._snackBar.open(message, undefined, {
			panelClass: [
				'notification-error'
			]
		});
	}
}
