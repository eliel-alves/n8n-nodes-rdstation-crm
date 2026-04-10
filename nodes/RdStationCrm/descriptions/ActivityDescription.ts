import { INodeProperties } from 'n8n-workflow';

export const activityOperations: INodeProperties[] = [
	{
		displayName: 'Operação',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['activity'],
			},
		},
		options: [
			{
				name: 'Criar',
				value: 'create',
				description: 'Cria uma anotação em uma negociação',
				action: 'Criar uma anotação',
			},
			{
				name: 'Obter Vários',
				value: 'getAll',
				description: 'Lista anotações com filtro por negociação',
				action: 'Obter várias anotações',
			},
		],
		default: 'getAll',
	},
];

export const activityFields: INodeProperties[] = [
	// ----------------------------------
	//         activity: create — campos obrigatórios
	// ----------------------------------
	{
		displayName: 'ID da Negociação',
		name: 'deal_id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['activity'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'O ID da negociação relacionada a esta anotação',
	},
	{
		displayName: 'Texto da Anotação',
		name: 'text',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['activity'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Conteúdo/texto da anotação',
	},

	// ----------------------------------
	//         activity: getAll
	// ----------------------------------
	{
		displayName: 'Retornar Todos',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['activity'],
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
				resource: ['activity'],
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

	// ----------------------------------
	//    activity: create — Campos Adicionais
	// ----------------------------------
	{
		displayName: 'Campos Adicionais',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Adicionar Campo',
		default: {},
		displayOptions: {
			show: {
				resource: ['activity'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Responsável',
				name: 'user_id',
				type: 'options',
				typeOptions: { loadOptionsMethod: 'getUsers' },
				default: '',
				description: 'Usuário autor da anotação',
			},
		],
	},

	// ----------------------------------
	//         activity: getAll — Filtros
	// ----------------------------------
	{
		displayName: 'Filtros',
		name: 'filters',
		type: 'collection',
		placeholder: 'Adicionar Filtro',
		default: {},
		displayOptions: {
			show: {
				resource: ['activity'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'ID da Negociação',
				name: 'deal_id',
				type: 'string',
				default: '',
				description: 'Filtrar anotações pelo ID da negociação',
			},
		],
	},
];
