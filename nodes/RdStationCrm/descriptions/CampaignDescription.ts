import { INodeProperties } from 'n8n-workflow';

export const campaignOperations: INodeProperties[] = [
	{
		displayName: 'Operação',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['campaign'],
			},
		},
		options: [
			{
				name: 'Criar',
				value: 'create',
				description: 'Cria uma nova campanha',
				action: 'Criar uma campanha',
			},
			{
				name: 'Obter',
				value: 'get',
				description: 'Busca uma campanha pelo ID',
				action: 'Obter uma campanha',
			},
			{
				name: 'Obter Vários',
				value: 'getAll',
				description: 'Lista campanhas cadastradas',
				action: 'Obter várias campanhas',
			},
			{
				name: 'Atualizar',
				value: 'update',
				description: 'Atualiza nome ou descrição de uma campanha',
				action: 'Atualizar uma campanha',
			},
		],
		default: 'getAll',
	},
];

export const campaignFields: INodeProperties[] = [
	// ----------------------------------
	//         campaign: get / update
	// ----------------------------------
	{
		displayName: 'ID da Campanha',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['get', 'update'],
			},
		},
		default: '',
		description: 'O ID da campanha',
	},

	// ----------------------------------
	//         campaign: create
	// ----------------------------------
	{
		displayName: 'Nome',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Nome da campanha',
	},

	// ----------------------------------
	//         campaign: getAll
	// ----------------------------------
	{
		displayName: 'Retornar Todos',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['campaign'],
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
				resource: ['campaign'],
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
	//    campaign: create / update — Campos Adicionais
	// ----------------------------------
	{
		displayName: 'Campos Adicionais',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Adicionar Campo',
		default: {},
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Nome',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Novo nome para a campanha',
			},
			{
				displayName: 'Descrição',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Descrição da campanha',
			},
		],
	},

	// ----------------------------------
	//         campaign: getAll — Filtros
	// ----------------------------------
	{
		displayName: 'Filtros',
		name: 'filters',
		type: 'collection',
		placeholder: 'Adicionar Filtro',
		default: {},
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Busca',
				name: 'q',
				type: 'string',
				default: '',
				description: 'Buscar campanha por nome',
			},
		],
	},
];
