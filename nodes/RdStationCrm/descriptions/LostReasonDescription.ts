import { INodeProperties } from 'n8n-workflow';

export const lostReasonOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['lostReason'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a lost reason',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many lost reasons',
			},
		],
		default: 'getAll',
	},
];

export const lostReasonFields: INodeProperties[] = [
	// ----------------------------------
	//         lostReason: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lostReason'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The name of the lost reason',
	},

	// ----------------------------------
	//         lostReason: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['lostReason'],
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
				resource: ['lostReason'],
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
	//         lostReason: getAll — Filters
	// ----------------------------------
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['lostReason'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Search',
				name: 'q',
				type: 'string',
				default: '',
				description: 'Search lost reasons by name',
			},
		],
	},
];
