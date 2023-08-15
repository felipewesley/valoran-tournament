import { ActionTypeEnum } from "app/domain/enums/home/action-type.enum";

/**
 * @interface
 */
export interface HomeActionListModel {
	sequencePosition: number;
	type: ActionTypeEnum;
	title: string;
	icon: string;
	url?: string;
	description: string;
	enabled: boolean;
}
