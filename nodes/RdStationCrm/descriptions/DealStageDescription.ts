import { INodeProperties } from 'n8n-workflow';

export const dealStageOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
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
				name: 'Create',
				value: 'create',
				action: 'Create a deal stage',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a deal stage',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many deal stages',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a deal stage',
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
		displayName: 'Deal Stage ID',
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
		description: 'The ID of the deal stage',
	},

	// ----------------------------------
	//         dealStage: create
	// ----------------------------------
	{
		displayName: 'Name',
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
		description: 'The name of the deal stage',
	},
	{
		displayName: 'Deal Pipeline ID',
		name: 'deal_pipeline_id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['dealStage'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the pipeline this stage belongs to',
	},

	// ----------------------------------
	//         dealStage: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['dealStage'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
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
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//    dealStage: create — Additional Fields
	// ----------------------------------
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['dealStage'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Nickname',
				name: 'nickname',
				type: 'string',
				default: '',
				description: 'Short code for the deal stage (e.g., "NL", "QF")',
			},
		],
	},

	// ----------------------------------
	//    dealStage: update — Additional Fields
	// ----------------------------------
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['dealStage'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The new name for the deal stage',
			},
			{
				displayName: 'Nickname',
				name: 'nickname',
				type: 'string',
				default: '',
				description: 'Short code for the deal stage (e.g., "NL", "QF")',
			},
		],
	},

	// ----------------------------------
	//    dealStage: getAll — Filters
	// ----------------------------------
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['dealStage'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Deal Pipeline ID',
				name: 'deal_pipeline_id',
				type: 'string',
				default: '',
				description: 'Filter stages by pipeline ID',
			},
		],
	},
];
