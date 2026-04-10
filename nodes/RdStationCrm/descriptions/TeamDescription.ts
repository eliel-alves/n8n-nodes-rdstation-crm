import { INodeProperties } from 'n8n-workflow';

export const teamOperations: INodeProperties[] = [
	{
		displayName: 'Operação',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['team'],
			},
		},
		options: [
			{
				name: 'Obter',
				value: 'get',
				description: 'Busca uma equipe pelo ID',
				action: 'Obter uma equipe',
			},
			{
				name: 'Obter Vários',
				value: 'getAll',
				description: 'Lista todas as equipes do CRM',
				action: 'Obter várias equipes',
			},
		],
		default: 'getAll',
	},
];

export const teamFields: INodeProperties[] = [
	// ----------------------------------
	//         team: get
	// ----------------------------------
	{
		displayName: 'ID da Equipe',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'O ID da equipe',
	},

	// ----------------------------------
	//         team: getAll
	// ----------------------------------
	{
		displayName: 'Retornar Todos',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Se deve retornar todos os resultados ou apenas até um limite definido',
	},
	{
		displayName: 'Limite',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
		default: 50,
		description: 'Número máximo de resultados a retornar',
	},
];
