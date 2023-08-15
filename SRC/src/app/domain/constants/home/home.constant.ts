import { ActionTypeEnum } from "app/domain/enums/home/action-type.enum";
import { HomeActionListModel } from "app/domain/models/home/action-list.model";

/**
 * Home page constants
 * @constant
 */
export const HOME_CONSTANTS = {

	/**
	 * Default home page actions
	 */
	get actions(): HomeActionListModel[] {

		return [
			{
				sequencePosition: 1,
				type: ActionTypeEnum.SetupTournament,
				title: 'Configurar o torneio',
				icon: 'settings',
				description: 'Aplique algumas configurações gerais ao torneio antes de iniciá-lo.',
				enabled: true
			},
			{
				sequencePosition: 2,
				type: ActionTypeEnum.ManageTeams,
				title: 'Gerenciar equipes',
				icon: 'groups',
				description: 'Aqui você poderá gerenciar as equipes envolvidas no torneio, podendo adicionar, editar e remover equipes.',
				enabled: true,
				url: '/tournament/teams'
			},
			{
				sequencePosition: 3,
				type: ActionTypeEnum.ManageKeys,
				title: 'Distribuir chaves',
				icon: 'schema',
				description: 'Organize e distribua as equipes em chaves para iniciar o torneio adequadamente.',
				enabled: true,
				url: '/tournament/keys'
			},
			{
				sequencePosition: 4,
				type: ActionTypeEnum.GoToTournament,
				title: 'Ir ao torneio',
				icon: 'emoji_events',
				description: 'Esta ação permite que você avance para o módulo de gerenciamento do torneio, podendo iniciá-lo ou acompanhá-lo.',
				enabled: true,
				url: '/tournament/start'
			},
		];
	}

};
