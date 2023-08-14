import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable, map, of, take, tap } from "rxjs";

import { Guid } from "app/common/types/guid";

import { AuthModel } from "app/domain/models/auth/auth.model";
import { SignInModel } from "app/domain/models/auth/sign-in.model";

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	// --------------------------------------------------
	// Properties
	// --------------------------------------------------

	private _authData = new BehaviorSubject<AuthModel>(null);

	/**
	 * Constructor
	 */
	constructor() { }

	// --------------------------------------------------
	// Accessors
	// --------------------------------------------------

	/**
	 * Getter - Authenticated
	 */
	public get authenticated$(): Observable<boolean> {

		return this._authData.asObservable()
			.pipe(
				map(data => !!data)
			);
	}

	// --------------------------------------------------
	// Public methods
	// --------------------------------------------------

	/**
	 * Sign in the user and returns a JSON Web Token (JWT)
	 * @param model
	 * @returns
	 */
	public signIn(model: SignInModel): Observable<string> {

		return this._signIn(model)
			.pipe(
				tap(token => {

					const authData: AuthModel = {
						email: model.email,
						jwt: token
					};

					this._authData.next(authData);
				})
			);
	}

	// --------------------------------------------------
	// Private methods
	// --------------------------------------------------

	private _signIn(model: SignInModel): Observable<string> {

		const jwt = Guid.newGuid().toString();

		// return this._http.post<string>(url, model)
		return of(jwt)
			.pipe(
				take(1)
			);
	}
}
