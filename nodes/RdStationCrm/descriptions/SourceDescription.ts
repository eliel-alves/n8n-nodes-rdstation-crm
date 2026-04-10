import { INodeProperties } from 'n8n-workflow';

export const sourceOperations: INodeProperties[] = [
	{
		displayName: 'Operação',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['source'],
			},
		},
		options: [
			{
				name: 'Criar',
				value: 'create',
				description: 'Cria uma nova fonte de negociação',
				action: 'Criar uma fonte',
			},
			{
				name: 'Obter',
				value: 'get',
				description: 'Busca uma fonte pelo ID',
				action: 'Obter uma fonte',
			},
			{
				name: 'Obter Vários',
				value: 'getAll',
				description: 'Lista fontes de negociação cadastradas',
				action: 'Obter várias fontes',
			},
			{
				name: 'Atualizar',
				value: 'update',
				description: 'Atualiza nome ou descrição de uma fonte',
				action: 'Atualizar uma fonte',
			},
		],
		default: 'getAll',
	},
];

export const sourceFields: INodeProperties[] = [
	// ----------------------------------
	//         source: get / update
	// ----------------------------------
	{
		displayName: 'ID da Fonte',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['source'],
				operation: ['get', 'update'],
			},
		},
		default: '',
		description: 'O ID da fonte',
	},

	// ----------------------------------
	//         source: create
	// ----------------------------------
	{
		displayName: 'Nome',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['source'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Nome da fonte de negociação',
	},

	// ----------------------------------
	//         source: getAll
	// ----------------------------------
	{
		displayName: 'Retornar Todos',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['source'],
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
				resource: ['source'],
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
	//    source: create / update — Campos Adicionais
	// ----------------------------------
	{
		displayName: 'Campos Adicionais',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Adicionar Campo',
		default: {},
		displayOptions: {
			show: {
				resource: ['source'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Nome',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Novo nome para a fonte',
			},
			{
				displayName: 'Descrição',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Descrição da fonte',
			},
		],
	},

	// ----------------------------------
	//         source: getAll — Filtros
	// ----------------------------------
	{
		displayName: 'Filtros',
		name: 'filters',
		type: 'collection',
		placeholder: 'Adicionar Filtro',
		default: {},
		displayOptions: {
			show: {
				resource: ['source'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Busca',
				name: 'q',
				type: 'string',
				default: '',
				description: 'Buscar fonte por nome',
			},
		],
	},
];
