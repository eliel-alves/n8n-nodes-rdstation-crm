import { INodeProperties } from 'n8n-workflow';

export const customFieldOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
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
				name: 'Create',
				value: 'create',
				action: 'Create a custom field',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a custom field',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a custom field',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many custom fields',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a custom field',
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
		displayName: 'Custom Field ID',
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
		description: 'The ID of the custom field',
	},

	// ----------------------------------
	//         customField: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The label/name of the custom field',
	},
	{
		displayName: 'Entity',
		name: 'entity',
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
				name: 'Contact',
				value: 'contact',
			},
			{
				name: 'Deal',
				value: 'deal',
			},
			{
				name: 'Organization',
				value: 'organization',
			},
		],
		default: 'deal',
		description: 'The entity type the custom field belongs to',
	},
	{
		displayName: 'Field Type',
		name: 'field_type',
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
				name: 'Checkbox',
				value: 'checkbox',
			},
			{
				name: 'Date',
				value: 'date',
			},
			{
				name: 'Number',
				value: 'number',
			},
			{
				name: 'Select',
				value: 'select',
			},
			{
				name: 'Text',
				value: 'text',
			},
			{
				name: 'URL',
				value: 'url',
			},
		],
		default: 'text',
		description: 'The type of the custom field',
	},

	// ----------------------------------
	//         customField: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['customField'],
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
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//    customField: create / update — Additional Fields
	// ----------------------------------
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'New name/label for the custom field',
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'string',
				default: '',
				// TODO: Verify if API expects comma-separated string or JSON array for this field
				description: 'Comma-separated list of options for select-type fields (e.g. "Option A,Option B,Option C")',
			},
		],
	},

	// ----------------------------------
	//         customField: getAll — Filters
	// ----------------------------------
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Entity',
				name: 'entity',
				type: 'options',
				options: [
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Deal',
						value: 'deal',
					},
					{
						name: 'Organization',
						value: 'organization',
					},
				],
				default: 'deal',
				description: 'Filter custom fields by entity type',
			},
		],
	},
];
