import { INodeProperties } from 'n8n-workflow';

export const dealOperations: INodeProperties[] = [
	{
		displayName: 'Operação',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['deal'],
			},
		},
		options: [
			{
				name: 'Criar',
				value: 'create',
				description: 'Cria uma nova negociação no CRM',
				action: 'Criar uma negociação',
			},
			{
				name: 'Obter',
				value: 'get',
				description: 'Busca uma negociação pelo ID',
				action: 'Obter uma negociação',
			},
			{
				name: 'Obter Vários',
				value: 'getAll',
				description: 'Lista negociações com filtros opcionais',
				action: 'Obter várias negociações',
			},
			{
				name: 'Atualizar',
				value: 'update',
				description: 'Atualiza campos de uma negociação existente',
				action: 'Atualizar uma negociação',
			},
		],
		default: 'getAll',
	},
];

export const dealFields: INodeProperties[] = [
	// ----------------------------------
	//         deal: get / update
	// ----------------------------------
	{
		displayName: 'ID da Negociação',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['get', 'update'],
			},
		},
		default: '',
		description: 'O ID da negociação',
	},

	// ----------------------------------
	//         deal: create
	// ----------------------------------
	{
		displayName: 'Nome',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'O nome/título da negociação',
	},

	// ----------------------------------
	//    deal: create / update — Campos de Pipeline, Etapa e Usuário
	// ----------------------------------
	{
		displayName: 'Funil',
		name: 'deal_pipeline_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getPipelines',
		},
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'O funil ao qual a negociação pertence',
	},
	{
		displayName: 'Etapa do Funil',
		name: 'deal_stage_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getStages',
			loadOptionsDependsOn: ['deal_pipeline_id'],
		},
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'A etapa do funil para a negociação',
	},
	{
		displayName: 'Responsável',
		name: 'user_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getUsers',
		},
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'O usuário responsável pela negociação',
	},

	// ----------------------------------
	//    deal: create / update — Campos Adicionais
	// ----------------------------------
	{
		displayName: 'Campos Adicionais',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Adicionar Campo',
		default: {},
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Valor Mensal (MRR)',
				name: 'amount_montly',
				type: 'number',
				default: 0,
				description: 'Valor recorrente mensal da negociação',
			},
			{
				displayName: 'Valor Único',
				name: 'amount_unique',
				type: 'number',
				default: 0,
				description: 'Valor único da negociação',
			},
			{
				displayName: 'Valor Total',
				name: 'amount_total',
				type: 'number',
				default: 0,
				description: 'Valor total da negociação',
			},
			{
				displayName: 'Campanha',
				name: 'campaign_id',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getCampaigns',
				},
				default: '',
				description: 'A campanha associada à negociação',
			},
			{
				displayName: 'Motivo de Perda',
				name: 'deal_lost_reason_id',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getLostReasons',
				},
				default: '',
				description: 'O motivo de perda da negociação',
			},
			{
				displayName: 'Fonte da Negociação',
				name: 'deal_source_id',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getSources',
				},
				default: '',
				description: 'A fonte da negociação',
			},
			{
				displayName: 'Descrição',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Notas ou descrição adicional da negociação',
			},
			{
				displayName: 'Em Espera',
				name: 'hold',
				type: 'boolean',
				default: false,
				description: 'Se a negociação está em espera',
			},
			{
				displayName: 'Previsão de Fechamento',
				name: 'prediction_date',
				type: 'dateTime',
				default: '',
				description: 'Data prevista de fechamento da negociação',
			},
			{
				displayName: 'Temperatura',
				name: 'rating',
				type: 'options',
				options: [
					{
						name: 'Sem Avaliação',
						value: 0,
					},
					{
						name: 'Fria',
						value: 1,
					},
					{
						name: 'Morna',
						value: 2,
					},
					{
						name: 'Quente',
						value: 3,
					},
				],
				default: 0,
				description: 'A temperatura/avaliação da negociação',
			},
			{
				displayName: 'Negociação Ganha',
				name: 'win',
				type: 'boolean',
				default: false,
				description: 'Se a negociação foi ganha',
			},
			{
				displayName: 'ID do Contato',
				name: 'contact_id',
				type: 'string',
				default: '',
				description: 'ID de um contato existente para vincular à negociação',
			},
		],
	},

	// ----------------------------------
	//    deal: create / update — Campos Personalizados
	// ----------------------------------
	{
		displayName: 'Campos Personalizados',
		name: 'deal_custom_fields',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Adicionar Campo Personalizado',
		default: {},
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				name: 'customFieldValues',
				displayName: 'Campo Personalizado',
				values: [
					{
						displayName: 'Campo',
						name: 'custom_field_id',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getDealCustomFields',
						},
						default: '',
						description: 'Selecione o campo personalizado',
					},
					{
						displayName: 'Valor',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Valor do campo personalizado',
					},
				],
			},
		],
	},

	// ----------------------------------
	//         deal: getAll
	// ----------------------------------
	{
		displayName: 'Retornar Todos',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Se deve retornar todos os resultados ou apenas até um limite',
	},
	{
		displayName: 'Limite',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['deal'],
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
	//         deal: getAll — Filtros
	// ----------------------------------
	{
		displayName: 'Filtros',
		name: 'filters',
		type: 'collection',
		placeholder: 'Adicionar Filtro',
		default: {},
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Campanha',
				name: 'campaign_id',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getCampaigns',
				},
				default: '',
				description: 'Filtrar negociações por campanha',
			},
			{
				displayName: 'Criado Em',
				name: 'created_at',
				type: 'dateTime',
				default: '',
				description: 'Filtrar negociações por data de criação',
			},
			{
				displayName: 'Motivo de Perda',
				name: 'deal_lost_reason_id',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getLostReasons',
				},
				default: '',
				description: 'Filtrar negociações por motivo de perda',
			},
			{
				displayName: 'Funil',
				name: 'deal_pipeline_id',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getPipelines',
				},
				default: '',
				description: 'Filtrar negociações por funil',
			},
			{
				displayName: 'Fonte da Negociação',
				name: 'deal_source_id',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getSources',
				},
				default: '',
				description: 'Filtrar negociações por fonte',
			},
			{
				displayName: 'Etapa do Funil',
				name: 'deal_stage_id',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getStages',
					loadOptionsDependsOn: ['filters.deal_pipeline_id'],
				},
				default: '',
				description: 'Filtrar negociações por etapa do funil',
			},
			{
				displayName: 'Em Espera',
				name: 'hold',
				type: 'boolean',
				default: false,
				description: 'Filtrar negociações por status de espera',
			},
			{
				displayName: 'Nome (busca parcial)',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Filtrar negociações por nome (busca parcial)',
			},
			{
				displayName: 'Previsão de Fechamento',
				name: 'prediction_date',
				type: 'dateTime',
				default: '',
				description: 'Filtrar negociações por data prevista de fechamento',
			},
			{
				displayName: 'Atualizado Em',
				name: 'updated_at',
				type: 'dateTime',
				default: '',
				description: 'Filtrar negociações por data de atualização',
			},
			{
				displayName: 'Responsável',
				name: 'user_id',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getUsers',
				},
				default: '',
				description: 'Filtrar negociações por usuário responsável',
			},
			{
				displayName: 'Negociação Ganha',
				name: 'win',
				type: 'boolean',
				default: false,
				description: 'Filtrar negociações por status de ganho',
			},
		],
	},
];
