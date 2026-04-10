import { INodeProperties } from 'n8n-workflow';

export const dealPipelineOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['dealPipeline'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a deal pipeline',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a deal pipeline',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many deal pipelines',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a deal pipeline',
			},
		],
		default: 'getAll',
	},
];

export const dealPipelineFields: INodeProperties[] = [
	// ----------------------------------
	//         dealPipeline: get / update
	// ----------------------------------
	{
		displayName: 'Deal Pipeline ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['dealPipeline'],
				operation: ['get', 'update'],
			},
		},
		default: '',
		description: 'The ID of the deal pipeline',
	},

	// ----------------------------------
	//         dealPipeline: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['dealPipeline'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The name of the deal pipeline',
	},

	// ----------------------------------
	//         dealPipeline: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['dealPipeline'],
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
				resource: ['dealPipeline'],
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
	//    dealPipeline: update — Additional Fields
	// ----------------------------------
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['dealPipeline'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The new name for the deal pipeline',
			},
		],
	},
];
