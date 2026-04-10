import { INodeProperties } from 'n8n-workflow';

export const productOperations: INodeProperties[] = [
	{
		displayName: 'Operação',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['product'],
			},
		},
		options: [
			{
				name: 'Criar',
				value: 'create',
				description: 'Cria um novo produto no catálogo',
				action: 'Criar um produto',
			},
			{
				name: 'Obter',
				value: 'get',
				description: 'Busca um produto pelo ID',
				action: 'Obter um produto',
			},
			{
				name: 'Obter Vários',
				value: 'getAll',
				description: 'Lista produtos do catálogo',
				action: 'Obter vários produtos',
			},
			{
				name: 'Atualizar',
				value: 'update',
				description: 'Atualiza campos de um produto existente',
				action: 'Atualizar um produto',
			},
		],
		default: 'getAll',
	},
];

export const productFields: INodeProperties[] = [
	// ----------------------------------
	//         product: get / update
	// ----------------------------------
	{
		displayName: 'ID do Produto',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['get', 'update'],
			},
		},
		default: '',
		description: 'O ID do produto',
	},

	// ----------------------------------
	//         product: create
	// ----------------------------------
	{
		displayName: 'Nome',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Nome do produto',
	},

	// ----------------------------------
	//         product: getAll
	// ----------------------------------
	{
		displayName: 'Retornar Todos',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['product'],
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
				resource: ['product'],
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
	//    product: create / update — Campos Adicionais
	// ----------------------------------
	{
		displayName: 'Campos Adicionais',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Adicionar Campo',
		default: {},
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Descrição',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Descrição do produto',
			},
			{
				displayName: 'Preço Base',
				name: 'base_price',
				type: 'number',
				default: 0,
				description: 'Preço base do produto',
			},
			{
				displayName: 'Preço de Venda',
				name: 'price',
				type: 'number',
				default: 0,
				description: 'Preço de venda do produto',
			},
			{
				displayName: 'Unidade',
				name: 'unit',
				type: 'string',
				default: '',
				description: 'Unidade de medida do produto (ex: "un", "kg")',
			},
		],
	},

	// ----------------------------------
	//    product: create / update — Campos Personalizados
	// ----------------------------------
	{
		displayName: 'Campos Personalizados',
		name: 'product_custom_fields',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		placeholder: 'Adicionar Campo Personalizado',
		default: {},
		displayOptions: {
			show: {
				resource: ['product'],
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
						typeOptions: { loadOptionsMethod: 'getProductCustomFields' },
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
	//         product: getAll — Filtros
	// ----------------------------------
	{
		displayName: 'Filtros',
		name: 'filters',
		type: 'collection',
		placeholder: 'Adicionar Filtro',
		default: {},
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Busca',
				name: 'q',
				type: 'string',
				default: '',
				description: 'Buscar produto por nome',
			},
		],
	},
];
