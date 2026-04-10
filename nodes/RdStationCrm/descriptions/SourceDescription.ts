import { INodeProperties } from 'n8n-workflow';

export const sourceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['source'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a source',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a source',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many sources',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a source',
			},
		],
		default: 'getAll',
	},
];

export const sourceFields: INodeProperties[] = [
	// ----------------------------------
	//         source: get / update
	// ----------------------------------
	{
		displayName: 'Source ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['source'],
				operation: ['get', 'update'],
			},
		},
		default: '',
		description: 'The ID of the source',
	},

	// ----------------------------------
	//         source: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['source'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The name of the deal source',
	},

	// ----------------------------------
	//         source: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['source'],
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
				resource: ['source'],
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
	//    source: update — Additional Fields
	// ----------------------------------
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['source'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The new name for the source',
			},
		],
	},

	// ----------------------------------
	//         source: getAll — Filters
	// ----------------------------------
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['source'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Search',
				name: 'q',
				type: 'string',
				default: '',
				description: 'Search sources by name',
			},
		],
	},
];
