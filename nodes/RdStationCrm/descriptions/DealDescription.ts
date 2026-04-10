import { INodeProperties } from 'n8n-workflow';

export const dealOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['deal'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a deal',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a deal',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many deals',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a deal',
			},
		],
		default: 'getAll',
	},
];

export const dealFields: INodeProperties[] = [
	// ----------------------------------
	//         deal: get / update
	// ----------------------------------
	{
		displayName: 'Deal ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['get', 'update'],
			},
		},
		default: '',
		description: 'The ID of the deal',
	},

	// ----------------------------------
	//         deal: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The name/title of the deal',
	},

	// ----------------------------------
	//         deal: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['deal'],
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
				resource: ['deal'],
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
	//    deal: create / update — Additional Fields
	// ----------------------------------
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				// TODO: Verify exact API field name - may be 'amount_montly' (API typo) or 'amount_monthly'
				displayName: 'Amount (Monthly)',
				name: 'amount_montly',
				type: 'number',
				default: 0,
				description: 'Monthly recurring amount for the deal',
			},
			{
				displayName: 'Amount (One-Time)',
				name: 'amount_unique',
				type: 'number',
				default: 0,
				description: 'One-time amount for the deal',
			},
			{
				displayName: 'Amount (Total)',
				name: 'amount_total',
				type: 'number',
				default: 0,
				description: 'Total amount for the deal',
			},
			{
				displayName: 'Campaign ID',
				name: 'campaign_id',
				type: 'string',
				default: '',
				description: 'The ID of the campaign associated with the deal',
			},
			{
				displayName: 'Deal Lost Reason ID',
				name: 'deal_lost_reason_id',
				type: 'string',
				default: '',
				description: 'The ID of the lost reason for the deal',
			},
			{
				displayName: 'Deal Pipeline ID',
				name: 'deal_pipeline_id',
				type: 'string',
				default: '',
				description: 'The ID of the pipeline/funnel for the deal',
			},
			{
				displayName: 'Deal Source ID',
				name: 'deal_source_id',
				type: 'string',
				default: '',
				description: 'The ID of the deal source',
			},
			{
				displayName: 'Deal Stage ID',
				name: 'deal_stage_id',
				type: 'string',
				default: '',
				description: 'The ID of the funnel stage for the deal',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Additional notes or description for the deal',
			},
			{
				displayName: 'Hold',
				name: 'hold',
				type: 'boolean',
				default: false,
				description: 'Whether the deal is currently on hold',
			},
			{
				displayName: 'Prediction Date',
				name: 'prediction_date',
				type: 'dateTime',
				default: '',
				description: 'Expected close date for the deal',
			},
			{
				displayName: 'Rating',
				name: 'rating',
				type: 'options',
				options: [
					{
						name: 'No Rating',
						value: 0,
					},
					{
						name: 'Cold',
						value: 1,
					},
					{
						name: 'Warm',
						value: 2,
					},
					{
						name: 'Hot',
						value: 3,
					},
				],
				default: 0,
				description: 'The temperature/rating of the deal',
			},
			{
				displayName: 'User ID',
				name: 'user_id',
				type: 'string',
				default: '',
				description: 'The ID of the user responsible for the deal',
			},
			{
				displayName: 'Win',
				name: 'win',
				type: 'boolean',
				default: false,
				description: 'Whether the deal has been won',
			},
		],
	},

	// ----------------------------------
	//         deal: getAll — Filters
	// ----------------------------------
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Campaign ID',
				name: 'campaign_id',
				type: 'string',
				default: '',
				description: 'Filter deals by campaign ID',
			},
			{
				displayName: 'Created At',
				name: 'created_at',
				type: 'dateTime',
				default: '',
				description: 'Filter deals by creation date',
			},
			{
				displayName: 'Deal Lost Reason ID',
				name: 'deal_lost_reason_id',
				type: 'string',
				default: '',
				description: 'Filter deals by lost reason ID',
			},
			{
				displayName: 'Deal Pipeline ID',
				name: 'deal_pipeline_id',
				type: 'string',
				default: '',
				description: 'Filter deals by pipeline ID',
			},
			{
				displayName: 'Deal Source ID',
				name: 'deal_source_id',
				type: 'string',
				default: '',
				description: 'Filter deals by source ID',
			},
			{
				displayName: 'Deal Stage ID',
				name: 'deal_stage_id',
				type: 'string',
				default: '',
				description: 'Filter deals by stage ID',
			},
			{
				displayName: 'Hold',
				name: 'hold',
				type: 'boolean',
				default: false,
				description: 'Filter deals by hold status',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Filter deals by name (partial match)',
			},
			{
				displayName: 'Prediction Date',
				name: 'prediction_date',
				type: 'dateTime',
				default: '',
				description: 'Filter deals by expected close date',
			},
			{
				displayName: 'Updated At',
				name: 'updated_at',
				type: 'dateTime',
				default: '',
				description: 'Filter deals by last update date',
			},
			{
				displayName: 'User ID',
				name: 'user_id',
				type: 'string',
				default: '',
				description: 'Filter deals by responsible user ID',
			},
			{
				displayName: 'Win',
				name: 'win',
				type: 'boolean',
				default: false,
				description: 'Filter deals by win status',
			},
		],
	},
];
