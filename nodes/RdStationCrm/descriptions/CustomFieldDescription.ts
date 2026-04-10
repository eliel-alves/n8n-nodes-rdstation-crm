import { INodeProperties } from 'n8n-workflow';

export const customFieldOperations: INodeProperties[] = [
	{
		displayName: 'Operação',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['customField'],
			},
		},
		options: [
			{
				name: 'Criar',
				value: 'create',
				description: 'Cria um novo campo personalizado para negociações, contatos ou empresas',
				action: 'Criar um campo personalizado',
			},
			{
				name: 'Excluir',
				value: 'delete',
				description: 'Remove permanentemente um campo personalizado',
				action: 'Excluir um campo personalizado',
			},
			{
				name: 'Obter',
				value: 'get',
				description: 'Busca um campo personalizado pelo ID',
				action: 'Obter um campo personalizado',
			},
			{
				name: 'Obter Vários',
				value: 'getAll',
				description: 'Lista campos personalizados com filtro por entidade',
				action: 'Obter vários campos personalizados',
			},
			{
				name: 'Atualizar',
				value: 'update',
				description: 'Atualiza rótulo, opções ou configurações de um campo personalizado',
				action: 'Atualizar um campo personalizado',
			},
		],
		default: 'getAll',
	},
];

export const customFieldFields: INodeProperties[] = [
	// ----------------------------------
	//         customField: delete / get / update
	// ----------------------------------
	{
		displayName: 'ID do Campo Personalizado',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['delete', 'get', 'update'],
			},
		},
		default: '',
		description: 'O ID do campo personalizado',
	},

	// ----------------------------------
	//         customField: create
	// ----------------------------------
	{
		displayName: 'Rótulo',
		name: 'label',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Nome/rótulo exibido do campo',
	},
	{
		displayName: 'Entidade',
		name: 'for',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Contato',
				value: 'contact',
			},
			{
				name: 'Negociação',
				value: 'deal',
			},
			{
				name: 'Empresa',
				value: 'organization',
			},
		],
		default: 'deal',
		description: 'Entidade à qual o campo personalizado pertence',
	},
	{
		displayName: 'Tipo do Campo',
		name: 'type',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Caixa de Seleção',
				value: 'checkbox',
			},
			{
				name: 'Data',
				value: 'date',
			},
			{
				name: 'Número',
				value: 'number',
			},
			{
				name: 'Seleção',
				value: 'option',
			},
			{
				name: 'Texto',
				value: 'text',
			},
			{
				name: 'URL',
				value: 'url',
			},
		],
		default: 'text',
		description: 'Tipo do campo personalizado',
	},

	// ----------------------------------
	//         customField: getAll
	// ----------------------------------
	{
		displayName: 'Retornar Todos',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['customField'],
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
				resource: ['customField'],
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
	//    customField: create / update — Campos Adicionais
	// ----------------------------------
	{
		displayName: 'Campos Adicionais',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Adicionar Campo',
		default: {},
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Rótulo',
				name: 'label',
				type: 'string',
				default: '',
				description: 'Novo rótulo para o campo personalizado',
			},
			{
				displayName: 'Opções',
				name: 'opts',
				type: 'string',
				default: '',
				description: 'Opções para campos do tipo Seleção. Separe com vírgulas (ex: Sim,Não,Talvez). Serão convertidas em array.',
			},
			{
				displayName: 'Permitir Nova Opção',
				name: 'allow_new',
				type: 'boolean',
				default: false,
				description: 'Permitir ao usuário adicionar novas opções no campo de seleção',
			},
			{
				displayName: 'Obrigatório',
				name: 'required',
				type: 'boolean',
				default: false,
				description: 'Se o preenchimento do campo é obrigatório',
			},
			{
				displayName: 'Único',
				name: 'unique',
				type: 'boolean',
				default: false,
				description: 'Se o valor deve ser único entre os registros',
			},
			{
				displayName: 'Ordem',
				name: 'order',
				type: 'number',
				default: 0,
				description: 'Posição de exibição do campo',
			},
		],
	},

	// ----------------------------------
	//         customField: getAll — Filtros
	// ----------------------------------
	{
		displayName: 'Filtros',
		name: 'filters',
		type: 'collection',
		placeholder: 'Adicionar Filtro',
		default: {},
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Entidade',
				name: 'for',
				type: 'options',
				options: [
					{
						name: 'Contato',
						value: 'contact',
					},
					{
						name: 'Negociação',
						value: 'deal',
					},
					{
						name: 'Empresa',
						value: 'organization',
					},
				],
				default: 'deal',
				description: 'Filtrar campos por entidade',
			},
		],
	},
];
