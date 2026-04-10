import { INodeProperties } from 'n8n-workflow';

export const lostReasonOperations: INodeProperties[] = [
	{
		displayName: 'Operação',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['lostReason'],
			},
		},
		options: [
			{
				name: 'Criar',
				value: 'create',
				description: 'Cria um novo motivo de perda de negociação',
				action: 'Criar um motivo de perda',
			},
			{
				name: 'Obter Vários',
				value: 'getAll',
				description: 'Lista todos os motivos de perda cadastrados',
				action: 'Obter vários motivos de perda',
			},
		],
		default: 'getAll',
	},
];

export const lostReasonFields: INodeProperties[] = [
	// ----------------------------------
	//         lostReason: create
	// ----------------------------------
	{
		displayName: 'Nome',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lostReason'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Nome do motivo de perda',
	},

	// ----------------------------------
	//         lostReason: getAll
	// ----------------------------------
	{
		displayName: 'Retornar Todos',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['lostReason'],
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
				resource: ['lostReason'],
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
	//         lostReason: getAll — Filtros
	// ----------------------------------
	{
		displayName: 'Filtros',
		name: 'filters',
		type: 'collection',
		placeholder: 'Adicionar Filtro',
		default: {},
		displayOptions: {
			show: {
				resource: ['lostReason'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Busca',
				name: 'q',
				type: 'string',
				default: '',
				description: 'Buscar motivos de perda por nome',
			},
		],
	},
];
