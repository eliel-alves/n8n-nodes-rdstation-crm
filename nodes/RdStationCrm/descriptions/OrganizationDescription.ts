import { INodeProperties } from 'n8n-workflow';

export const organizationOperations: INodeProperties[] = [
	{
		displayName: 'Operação',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['organization'],
			},
		},
		options: [
			{
				name: 'Criar',
				value: 'create',
				description: 'Cria uma nova empresa no CRM',
				action: 'Criar uma empresa',
			},
			{
				name: 'Obter',
				value: 'get',
				description: 'Busca uma empresa pelo ID',
				action: 'Obter uma empresa',
			},
			{
				name: 'Obter Vários',
				value: 'getAll',
				description: 'Lista empresas com filtros opcionais',
				action: 'Obter várias empresas',
			},
			{
				name: 'Atualizar',
				value: 'update',
				description: 'Atualiza campos de uma empresa existente',
				action: 'Atualizar uma empresa',
			},
		],
		default: 'getAll',
	},
];

export const organizationFields: INodeProperties[] = [
	// ----------------------------------
	//         organization: get / update
	// ----------------------------------
	{
		displayName: 'ID da Empresa',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['get', 'update'],
			},
		},
		default: '',
		description: 'O ID da empresa',
	},

	// ----------------------------------
	//         organization: create
	// ----------------------------------
	{
		displayName: 'Nome',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Nome da empresa',
	},

	// ----------------------------------
	//         organization: getAll
	// ----------------------------------
	{
		displayName: 'Retornar Todos',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['organization'],
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
				resource: ['organization'],
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
	//    organization: create / update — Additional Fields
	// ----------------------------------
	{
		displayName: 'Campos Adicionais',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Adicionar Campo',
		default: {},
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Endereço',
				name: 'address',
				type: 'string',
				default: '',
				description: 'Endereço completo da empresa',
			},
			{
				displayName: 'Cidade',
				name: 'city',
				type: 'string',
				default: '',
				description: 'Cidade da empresa',
			},
			{
				displayName: 'País',
				name: 'country',
				type: 'string',
				default: '',
				description: 'País da empresa',
			},
			{
				displayName: 'E-mail',
				name: 'email',
				type: 'string',
				default: '',
				description: 'E-mail principal da empresa',
			},
			{
				displayName: 'Facebook',
				name: 'facebook',
				type: 'string',
				default: '',
				description: 'URL do Facebook da empresa',
			},
			{
				displayName: 'Instagram',
				name: 'instagram',
				type: 'string',
				default: '',
				description: 'Perfil do Instagram da empresa',
			},
			{
				displayName: 'LinkedIn',
				name: 'linkedin',
				type: 'string',
				default: '',
				description: 'URL do LinkedIn da empresa',
			},
			{
				displayName: 'Telefone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'Telefone principal da empresa',
			},
			{
				displayName: 'Descrição',
				name: 'resume',
				type: 'string',
				default: '',
				description: 'Descrição ou observações da empresa',
			},
			{
				displayName: 'Estado',
				name: 'state',
				type: 'string',
				default: '',
				description: 'Estado da empresa',
			},
			{
				displayName: 'Twitter',
				name: 'twitter',
				type: 'string',
				default: '',
				description: 'Perfil do Twitter da empresa',
			},
			{
				displayName: 'ID do Responsável',
				name: 'user_id',
				type: 'options',
				typeOptions: { loadOptionsMethod: 'getUsers' },
				default: '',
				description: 'O ID do usuário responsável pela empresa',
			},
			{
				displayName: 'Website',
				name: 'url',
				type: 'string',
				default: '',
				description: 'URL do site da empresa',
			},
			{
				displayName: 'CEP',
				name: 'zip_code',
				type: 'string',
				default: '',
				description: 'CEP da empresa',
			},
		],
	},

	// ----------------------------------
	//         organization: getAll — Filters
	// ----------------------------------
	{
		displayName: 'Filtros',
		name: 'filters',
		type: 'collection',
		placeholder: 'Adicionar Filtro',
		default: {},
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Busca',
				name: 'q',
				type: 'string',
				default: '',
				description: 'Buscar por nome',
			},
			{
				displayName: 'ID do Responsável',
				name: 'user_id',
				type: 'string',
				default: '',
				description: 'Filtrar empresas pelo ID do responsável',
			},
		],
	},

	// ----------------------------------
	//    organization: create / update — Custom Fields
	// ----------------------------------
	{
		displayName: 'Campos Personalizados',
		name: 'organization_custom_fields',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		placeholder: 'Adicionar Campo Personalizado',
		default: {},
		displayOptions: {
			show: {
				resource: ['organization'],
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
						typeOptions: { loadOptionsMethod: 'getOrganizationCustomFields' },
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
