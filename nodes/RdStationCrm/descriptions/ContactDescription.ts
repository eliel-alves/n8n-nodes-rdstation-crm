import { INodeProperties } from 'n8n-workflow';

export const contactOperations: INodeProperties[] = [
	{
		displayName: 'Operação',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contact'],
			},
		},
		options: [
			{
				name: 'Criar',
				value: 'create',
				description: 'Cria um novo contato no CRM',
				action: 'Criar um contato',
			},
			{
				name: 'Obter',
				value: 'get',
				description: 'Busca um contato pelo ID',
				action: 'Obter um contato',
			},
			{
				name: 'Obter Vários',
				value: 'getAll',
				description: 'Lista contatos com filtros opcionais',
				action: 'Obter vários contatos',
			},
			{
				name: 'Atualizar',
				value: 'update',
				description: 'Atualiza campos de um contato existente',
				action: 'Atualizar um contato',
			},
		],
		default: 'getAll',
	},
];

export const contactFields: INodeProperties[] = [
	// ----------------------------------
	//         contact: get / update
	// ----------------------------------
	{
		displayName: 'ID do Contato',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['get', 'update'],
			},
		},
		default: '',
		description: 'O ID do contato',
	},

	// ----------------------------------
	//         contact: create
	// ----------------------------------
	{
		displayName: 'Nome',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Nome completo do contato',
	},

	// ----------------------------------
	//         contact: getAll
	// ----------------------------------
	{
		displayName: 'Retornar Todos',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['contact'],
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
				resource: ['contact'],
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
	//    contact: create / update — Additional Fields
	// ----------------------------------
	{
		displayName: 'Campos Adicionais',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Adicionar Campo',
		default: {},
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Data de Nascimento',
				name: 'birthday',
				type: 'fixedCollection',
				default: {},
				options: [
					{
						name: 'birthdayValues',
						displayName: 'Data de Nascimento',
						values: [
							{
								displayName: 'Dia',
								name: 'day',
								type: 'number',
								default: 1,
								typeOptions: { minValue: 1, maxValue: 31 },
							},
							{
								displayName: 'Mês',
								name: 'month',
								type: 'number',
								default: 1,
								typeOptions: { minValue: 1, maxValue: 12 },
							},
							{
								displayName: 'Ano',
								name: 'year',
								type: 'number',
								default: 2000,
								typeOptions: { minValue: 1900, maxValue: 2100 },
							},
						],
					},
				],
			},
			{
				displayName: 'E-mails',
				name: 'emails',
				type: 'fixedCollection',
				typeOptions: { multipleValues: true },
				default: {},
				options: [
					{
						name: 'emailValues',
						displayName: 'E-mail',
						values: [
							{
								displayName: 'E-mail',
								name: 'email',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
			{
				displayName: 'Facebook',
				name: 'facebook',
				type: 'string',
				default: '',
				description: 'URL do perfil do Facebook do contato',
			},
			{
				displayName: 'Instagram',
				name: 'instagram',
				type: 'string',
				default: '',
				description: 'Perfil do Instagram do contato',
			},
			{
				displayName: 'LinkedIn',
				name: 'linkedin',
				type: 'string',
				default: '',
				description: 'URL do perfil do LinkedIn do contato',
			},
			{
				displayName: 'Observações',
				name: 'notes',
				type: 'string',
				default: '',
				description: 'Observações ou descrição do contato',
			},
			{
				displayName: 'ID da Empresa',
				name: 'organization_id',
				type: 'string',
				default: '',
				description: 'O ID da empresa associada ao contato',
			},
			{
				displayName: 'Telefones',
				name: 'phones',
				type: 'fixedCollection',
				typeOptions: { multipleValues: true },
				default: {},
				options: [
					{
						name: 'phoneValues',
						displayName: 'Telefone',
						values: [
							{
								displayName: 'Telefone',
								name: 'phone',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Tipo',
								name: 'type',
								type: 'options',
								options: [
									{
										name: 'Celular',
										value: 'cellphone',
									},
									{
										name: 'Fax',
										value: 'fax',
									},
									{
										name: 'Residencial',
										value: 'home',
									},
									{
										name: 'Trabalho',
										value: 'work',
									},
								],
								default: 'cellphone',
							},
						],
					},
				],
			},
			{
				displayName: 'Skype',
				name: 'skype',
				type: 'string',
				default: '',
				description: 'Nome de usuário do Skype do contato',
			},
			{
				displayName: 'Cargo',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Cargo do contato',
			},
			{
				displayName: 'Twitter',
				name: 'twitter',
				type: 'string',
				default: '',
				description: 'Perfil do Twitter do contato',
			},
		],
	},

	// ----------------------------------
	//         contact: getAll — Filters
	// ----------------------------------
	{
		displayName: 'Filtros',
		name: 'filters',
		type: 'collection',
		placeholder: 'Adicionar Filtro',
		default: {},
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'E-mail',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Filtrar por e-mail',
			},
			{
				displayName: 'ID da Empresa',
				name: 'organization_id',
				type: 'string',
				default: '',
				description: 'Filtrar por empresa',
			},
			{
				displayName: 'Telefone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'Filtrar por telefone',
			},
			{
				displayName: 'Busca',
				name: 'q',
				type: 'string',
				default: '',
				description: 'Buscar por nome (correspondência parcial)',
			},
			{
				displayName: 'Cargo',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Filtrar por cargo',
			},
		],
	},

	// ----------------------------------
	//    contact: create / update — Custom Fields
	// ----------------------------------
	{
		displayName: 'Campos Personalizados',
		name: 'contact_custom_fields',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		placeholder: 'Adicionar Campo Personalizado',
		default: {},
		displayOptions: {
			show: {
				resource: ['contact'],
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
						typeOptions: { loadOptionsMethod: 'getContactCustomFields' },
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
];
