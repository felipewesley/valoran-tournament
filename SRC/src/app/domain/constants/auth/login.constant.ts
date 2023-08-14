import { SignInModel } from "../../models/auth/sign-in.model";

/**
 * Sign-in constant values
 * @constant
 */
export const SIGN_IN_CONSTANTS = {

	get defaultLogin(): SignInModel {

		return {
			email: 'felipe.basso@email.com',
			password: 'Acessar@2023'
		}
	}

};
