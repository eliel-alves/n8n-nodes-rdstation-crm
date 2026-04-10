import { INodeProperties } from 'n8n-workflow';

export const dealProductOperations: INodeProperties[] = [
	{
		displayName: 'Operação',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['dealProduct'],
			},
		},
		options: [
			{
				name: 'Adicionar',
				value: 'create',
				description: 'Vincula um produto do catálogo a uma negociação',
				action: 'Adicionar produto à negociação',
			},
			{
				name: 'Remover',
				value: 'delete',
				description: 'Remove um produto de uma negociação',
				action: 'Remover produto da negociação',
			},
			{
				name: 'Obter Vários',
				value: 'getAll',
				description: 'Lista todos os produtos de uma negociação',
				action: 'Obter produtos da negociação',
			},
			{
				name: 'Atualizar',
				value: 'update',
				description: 'Atualiza quantidade, preço ou desconto de um produto na negociação',
				action: 'Atualizar produto da negociação',
			},
		],
		default: 'getAll',
	},
];

export const dealProductFields: INodeProperties[] = [
	// ----------------------------------
	//   dealProduct: all operations — ID da Negociação
	// ----------------------------------
	{
		displayName: 'ID da Negociação',
		name: 'dealId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['dealProduct'],
			},
		},
		default: '',
		description: 'ID da negociação',
	},

	// ----------------------------------
	//   dealProduct: update / delete — ID do Produto na Negociação
	// ----------------------------------
	{
		displayName: 'ID do Produto na Negociação',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['dealProduct'],
				operation: ['update', 'delete'],
			},
		},
		default: '',
		description: 'O ID do produto na negociação',
	},

	// ----------------------------------
	//         dealProduct: create — campos obrigatórios
	// ----------------------------------
	{
		displayName: 'Produto',
		name: 'product_id',
		type: 'options',
		required: true,
		typeOptions: { loadOptionsMethod: 'getProducts' },
		displayOptions: {
			show: {
				resource: ['dealProduct'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Produto a ser adicionado à negociação',
	},
	{
		displayName: 'Quantidade',
		name: 'amount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['dealProduct'],
				operation: ['create'],
			},
		},
		default: 1,
		description: 'Quantidade do produto',
	},
	{
		displayName: 'Preço Unitário',
		name: 'price',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['dealProduct'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'Preço unitário do produto',
	},

	// ----------------------------------
	//    dealProduct: create / update — Campos Adicionais
	// ----------------------------------
	{
		displayName: 'Campos Adicionais',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Adicionar Campo',
		default: {},
		displayOptions: {
			show: {
				resource: ['dealProduct'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Desconto',
				name: 'discount',
				type: 'number',
				default: 0,
				description: 'Valor do desconto aplicado ao produto',
			},
			{
				displayName: 'Tipo de Desconto',
				name: 'discount_type',
				type: 'options',
				options: [
					{
						name: 'Percentual',
						value: 'percentage',
					},
					{
						name: 'Valor Fixo',
						value: 'value',
					},
				],
				default: 'percentage',
				description: 'Tipo de desconto aplicado',
			},
			{
				displayName: 'Recorrência',
				name: 'recurrence',
				type: 'string',
				default: '',
				description: 'Tipo de recorrência (ex: spare, monthly)',
			},
		],
	},
];
