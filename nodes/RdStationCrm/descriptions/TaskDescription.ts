import { INodeProperties } from 'n8n-workflow';

export const taskOperations: INodeProperties[] = [
	{
		displayName: 'Operação',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['task'],
			},
		},
		options: [
			{
				name: 'Criar',
				value: 'create',
				description: 'Cria uma nova tarefa vinculada a uma negociação',
				action: 'Criar uma tarefa',
			},
			{
				name: 'Obter',
				value: 'get',
				description: 'Busca uma tarefa pelo ID',
				action: 'Obter uma tarefa',
			},
			{
				name: 'Obter Vários',
				value: 'getAll',
				description: 'Lista tarefas com filtros opcionais',
				action: 'Obter várias tarefas',
			},
			{
				name: 'Atualizar',
				value: 'update',
				description: 'Atualiza campos de uma tarefa existente',
				action: 'Atualizar uma tarefa',
			},
		],
		default: 'getAll',
	},
];

export const taskFields: INodeProperties[] = [
	// ----------------------------------
	//         task: get / update
	// ----------------------------------
	{
		displayName: 'ID da Tarefa',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['get', 'update'],
			},
		},
		default: '',
		description: 'O ID da tarefa',
	},

	// ----------------------------------
	//         task: create — Required Fields
	// ----------------------------------
	{
		displayName: 'Assunto',
		name: 'subject',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Título ou assunto da tarefa',
	},
	{
		displayName: 'Tipo',
		name: 'type',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Almoço',
				value: 'lunch',
			},
			{
				name: 'E-mail',
				value: 'email',
			},
			{
				name: 'Ligação',
				value: 'call',
			},
			{
				name: 'Reunião',
				value: 'meeting',
			},
			{
				name: 'Tarefa',
				value: 'task',
			},
			{
				name: 'Visita',
				value: 'visit',
			},
			{
				name: 'WhatsApp',
				value: 'whatsapp',
			},
		],
		default: 'task',
		description: 'O tipo da tarefa',
	},
	{
		displayName: 'ID da Negociação',
		name: 'deal_id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'ID da negociação relacionada à tarefa',
	},
	{
		displayName: 'Responsável',
		name: 'user_id',
		type: 'options',
		required: true,
		typeOptions: { loadOptionsMethod: 'getUsers' },
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Usuário responsável pela tarefa',
	},
	{
		displayName: 'Data',
		name: 'date',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: 'YYYY-MM-DD',
		description: 'Data da tarefa (formato YYYY-MM-DD)',
	},
	{
		displayName: 'Hora',
		name: 'hour',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: 'HH:mm',
		description: 'Hora da tarefa (formato HH:mm)',
	},

	// ----------------------------------
	//         task: getAll
	// ----------------------------------
	{
		displayName: 'Retornar Todos',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['task'],
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
				resource: ['task'],
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
	//    task: create / update — Additional Fields
	// ----------------------------------
	{
		displayName: 'Campos Adicionais',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Adicionar Campo',
		default: {},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Assunto',
				name: 'subject',
				type: 'string',
				default: '',
				description: 'Título ou assunto da tarefa',
			},
			{
				displayName: 'Tipo',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Almoço', value: 'lunch' },
					{ name: 'E-mail', value: 'email' },
					{ name: 'Ligação', value: 'call' },
					{ name: 'Reunião', value: 'meeting' },
					{ name: 'Tarefa', value: 'task' },
					{ name: 'Visita', value: 'visit' },
					{ name: 'WhatsApp', value: 'whatsapp' },
				],
				default: 'task',
				description: 'O tipo da tarefa',
			},
			{
				displayName: 'ID da Negociação',
				name: 'deal_id',
				type: 'string',
				default: '',
				description: 'ID da negociação relacionada à tarefa',
			},
			{
				displayName: 'Responsável',
				name: 'user_id',
				type: 'options',
				typeOptions: { loadOptionsMethod: 'getUsers' },
				default: '',
				description: 'Usuário responsável pela tarefa',
			},
			{
				displayName: 'Data',
				name: 'date',
				type: 'string',
				default: '',
				placeholder: 'YYYY-MM-DD',
				description: 'Data da tarefa (formato YYYY-MM-DD)',
			},
			{
				displayName: 'Hora',
				name: 'hour',
				type: 'string',
				default: '',
				placeholder: 'HH:mm',
				description: 'Hora da tarefa (formato HH:mm)',
			},
			{
				displayName: 'ID do Contato',
				name: 'contact_id',
				type: 'string',
				default: '',
				description: 'O ID do contato relacionado à tarefa',
			},
			{
				displayName: 'Concluída',
				name: 'done',
				type: 'boolean',
				default: false,
				description: 'Se a tarefa foi concluída',
			},
			{
				displayName: 'Observações',
				name: 'notes',
				type: 'string',
				default: '',
				description: 'Observações ou descrição da tarefa',
			},
			{
				displayName: 'ID da Empresa',
				name: 'organization_id',
				type: 'string',
				default: '',
				description: 'O ID da empresa relacionada à tarefa',
			},
		],
	},

	// ----------------------------------
	//         task: getAll — Filters
	// ----------------------------------
	{
		displayName: 'Filtros',
		name: 'filters',
		type: 'collection',
		placeholder: 'Adicionar Filtro',
		default: {},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'ID do Contato',
				name: 'contact_id',
				type: 'string',
				default: '',
				description: 'Filtrar tarefas pelo ID do contato relacionado',
			},
			{
				displayName: 'ID da Negociação',
				name: 'deal_id',
				type: 'string',
				default: '',
				description: 'Filtrar tarefas pelo ID da negociação relacionada',
			},
			{
				displayName: 'Concluída',
				name: 'done',
				type: 'boolean',
				default: false,
				description: 'Filtrar tarefas pelo status de conclusão',
			},
			{
				displayName: 'Tipo',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Almoço', value: 'lunch' },
					{ name: 'E-mail', value: 'email' },
					{ name: 'Ligação', value: 'call' },
					{ name: 'Reunião', value: 'meeting' },
					{ name: 'Tarefa', value: 'task' },
					{ name: 'Visita', value: 'visit' },
					{ name: 'WhatsApp', value: 'whatsapp' },
				],
				default: 'task',
				description: 'Filtrar tarefas pelo tipo',
			},
			{
				displayName: 'ID do Responsável',
				name: 'user_id',
				type: 'string',
				default: '',
				description: 'Filtrar tarefas pelo ID do responsável',
			},
		],
	},
];
