import { INodeProperties } from 'n8n-workflow';

export const dealStageOperations: INodeProperties[] = [
	{
		displayName: 'Operação',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['dealStage'],
			},
		},
		options: [
			{
				name: 'Criar',
				value: 'create',
				description: 'Cria uma nova etapa dentro de um funil',
				action: 'Criar uma etapa do funil',
			},
			{
				name: 'Obter',
				value: 'get',
				description: 'Busca uma etapa pelo ID',
				action: 'Obter uma etapa do funil',
			},
			{
				name: 'Obter Vários',
				value: 'getAll',
				description: 'Lista etapas com filtro por funil',
				action: 'Obter várias etapas do funil',
			},
			{
				name: 'Atualizar',
				value: 'update',
				description: 'Atualiza nome, descrição ou ordem de uma etapa',
				action: 'Atualizar uma etapa do funil',
			},
		],
		default: 'getAll',
	},
];

export const dealStageFields: INodeProperties[] = [
	// ----------------------------------
	//         dealStage: get / update
	// ----------------------------------
	{
		displayName: 'ID da Etapa',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['dealStage'],
				operation: ['get', 'update'],
			},
		},
		default: '',
		description: 'O ID da etapa do funil',
	},

	// ----------------------------------
	//         dealStage: create
	// ----------------------------------
	{
		displayName: 'Nome',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['dealStage'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Nome da etapa',
	},
	{
		displayName: 'Funil de Vendas',
		name: 'deal_pipeline_id',
		type: 'options',
		required: true,
		typeOptions: { loadOptionsMethod: 'getPipelines' },
		displayOptions: {
			show: {
				resource: ['dealStage'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Funil ao qual a etapa pertence',
	},

	// ----------------------------------
	//         dealStage: getAll
	// ----------------------------------
	{
		displayName: 'Retornar Todos',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['dealStage'],
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
				resource: ['dealStage'],
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
	//    dealStage: create / update — Campos Adicionais
	// ----------------------------------
	{
		displayName: 'Campos Adicionais',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Adicionar Campo',
		default: {},
		displayOptions: {
			show: {
				resource: ['dealStage'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Nome',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Novo nome para a etapa do funil',
			},
			{
				displayName: 'Funil de Vendas',
				name: 'deal_pipeline_id',
				type: 'options',
				typeOptions: { loadOptionsMethod: 'getPipelines' },
				default: '',
				description: 'Funil ao qual a etapa pertence',
			},
			{
				displayName: 'Descrição',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Descrição da etapa do funil',
			},
			{
				displayName: 'Objetivo',
				name: 'objective',
				type: 'string',
				default: '',
				description: 'Objetivo desta etapa do funil',
			},
			{
				displayName: 'Ordem',
				name: 'order',
				type: 'number',
				default: 0,
				description: 'Posição de exibição',
			},
		],
	},

	// ----------------------------------
	//    dealStage: getAll — Filtros
	// ----------------------------------
	{
		displayName: 'Filtros',
		name: 'filters',
		type: 'collection',
		placeholder: 'Adicionar Filtro',
		default: {},
		displayOptions: {
			show: {
				resource: ['dealStage'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Funil de Vendas',
				name: 'deal_pipeline_id',
				type: 'options',
				typeOptions: { loadOptionsMethod: 'getPipelines' },
				default: '',
				description: 'Filtrar etapas pelo funil de vendas',
			},
		],
	},
];
