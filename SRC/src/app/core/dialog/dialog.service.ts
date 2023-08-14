import { ComponentType } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";

import { Observable, map, take } from "rxjs";

import { tournamentSetupDialogConfig } from "./config/tournament-setup";
import { teamFormDialogConfig } from "./config/team-form";

import {
	TournamentSetupDialogComponent,
	TournamentSetupDialogInput,
	TournamentSetupDialogResult
} from "app/shared/components/dialogs/tournament-setup";
import {
	TeamFormDialogComponent,
	TeamFormDialogInput,
	TeamFormDialogResult
} from "app/shared/components/dialogs/team-form";

/**
 * ### Application dialog service
 * Opens dialogs in application screens
 */
@Injectable({
	providedIn: 'root'
})
export class DialogService {

	/**
	 * Constructor
	 */
	constructor(
		private _matDialog: MatDialog
	) { }

	// --------------------------------------------------
	// Tournament setup dialog
	// --------------------------------------------------

	/**
	 * Opens the tournament setup dialog
	 */
	public tournamentSetup(): Observable<TournamentSetupDialogResult>;
	/**
	 * Opens the tournament setup dialog
	 * @param input
	 */
	public tournamentSetup(input: TournamentSetupDialogInput): Observable<TournamentSetupDialogResult>;
	public tournamentSetup(input?: TournamentSetupDialogInput): Observable<TournamentSetupDialogResult> {

		const config = tournamentSetupDialogConfig.getConfig();

		return this
			._open<TournamentSetupDialogComponent, TournamentSetupDialogResult, TournamentSetupDialogInput>(
				TournamentSetupDialogComponent,
				input!,
				config
			)
			.afterClosed()
			.pipe(
				map(res => res!),
				take(1),
			);
	}

	// --------------------------------------------------
	// Team form dialog
	// --------------------------------------------------

	/**
	 * Opens the team creation form
	 */
	public teamForm(): Observable<TeamFormDialogResult>;
	/**
	 * Opens the team edition form
	 * @param input
	 */
	public teamForm(input: TeamFormDialogInput): Observable<TeamFormDialogResult>;
	public teamForm(input?: TeamFormDialogInput): Observable<TeamFormDialogResult> {

		const config = teamFormDialogConfig.getConfig();

		return this
			._open<TeamFormDialogComponent, TeamFormDialogResult, TeamFormDialogInput>(
				TeamFormDialogComponent,
				input!,
				config
			)
			.afterClosed()
			.pipe(
				map(res => res!),
				take(1)
			);
	}

	// --------------------------------------------------
	// Generic "open" method
	// --------------------------------------------------

	private _open<C, R>(component: ComponentType<C>): MatDialogRef<C, R>;
	private _open<C, R, D>(component: ComponentType<C>, data: D): MatDialogRef<C, R>;
	private _open<C, R, D>(component: ComponentType<C>, data: D, config?: MatDialogConfig<D>): MatDialogRef<C, R>;
	private _open<C, R, D>(component: ComponentType<C>, data?: D, config?: MatDialogConfig<D>): MatDialogRef<C, R> {

		const dialogConfig = config ?? {} as MatDialogConfig<D>;

		return this._matDialog.open(component, { ...dialogConfig, data: data });
	}
}
