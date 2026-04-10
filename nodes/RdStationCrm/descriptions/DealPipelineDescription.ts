import { INodeProperties } from 'n8n-workflow';

export const dealPipelineOperations: INodeProperties[] = [
	{
		displayName: 'Operação',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['dealPipeline'],
			},
		},
		options: [
			{
				name: 'Criar',
				value: 'create',
				description: 'Cria um novo funil de vendas',
				action: 'Criar um funil de vendas',
			},
			{
				name: 'Obter',
				value: 'get',
				description: 'Busca um funil pelo ID',
				action: 'Obter um funil de vendas',
			},
			{
				name: 'Obter Vários',
				value: 'getAll',
				description: 'Lista todos os funis de vendas',
				action: 'Obter vários funis de vendas',
			},
			{
				name: 'Atualizar',
				value: 'update',
				description: 'Renomeia um funil de vendas existente',
				action: 'Atualizar um funil de vendas',
			},
		],
		default: 'getAll',
	},
];

export const dealPipelineFields: INodeProperties[] = [
	// ----------------------------------
	//         dealPipeline: get / update
	// ----------------------------------
	{
		displayName: 'ID do Funil',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['dealPipeline'],
				operation: ['get', 'update'],
			},
		},
		default: '',
		description: 'O ID do funil de vendas',
	},

	// ----------------------------------
	//         dealPipeline: create
	// ----------------------------------
	{
		displayName: 'Nome',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['dealPipeline'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Nome do funil de vendas',
	},

	// ----------------------------------
	//         dealPipeline: getAll
	// ----------------------------------
	{
		displayName: 'Retornar Todos',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['dealPipeline'],
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
				resource: ['dealPipeline'],
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
	//    dealPipeline: update — Campos Adicionais
	// ----------------------------------
	{
		displayName: 'Campos Adicionais',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Adicionar Campo',
		default: {},
		displayOptions: {
			show: {
				resource: ['dealPipeline'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Nome',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Novo nome para o funil',
			},
		],
	},
];
