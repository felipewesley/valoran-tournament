import { ActionTypeEnum } from "app/domain/enums/home/action-type.enum";

/**
 * @interface
 */
export interface HomeActionListModel {
	type: ActionTypeEnum;
	title: string;
	icon: string;
	description: string;
	enabled: boolean;
}
