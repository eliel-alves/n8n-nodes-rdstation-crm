import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class RdStationCrmApi implements ICredentialType {
	name = 'rdStationCrmApi';
	displayName = 'RD Station CRM API';
	documentationUrl = 'https://developers.rdstation.com/reference/crm-v1-introducao-e-requisitos';
	properties: INodeProperties[] = [
		{
			displayName: 'Token',
			name: 'token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Token da API do RD Station CRM. Obtido em Configurações > Integrações > Token de API.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				token: '={{$credentials.token}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://crm.rdstation.com/api/v1',
			url: '/users',
			method: 'GET',
		},
	};
}
