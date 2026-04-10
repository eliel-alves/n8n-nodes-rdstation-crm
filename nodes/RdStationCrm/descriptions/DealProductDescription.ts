import { INodeProperties } from 'n8n-workflow';

export const dealProductOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['dealProduct'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a deal product',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a deal product',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many deal products',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a deal product',
			},
		],
		default: 'getAll',
	},
];

export const dealProductFields: INodeProperties[] = [
	// ----------------------------------
	//   dealProduct: all operations — Deal ID
	// ----------------------------------
	{
		displayName: 'Deal ID',
		name: 'dealId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['dealProduct'],
			},
		},
		default: '',
		description: 'The ID of the parent deal',
	},

	// ----------------------------------
	//   dealProduct: update / delete — Deal Product ID
	// ----------------------------------
	{
		displayName: 'Deal Product ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['dealProduct'],
				operation: ['update', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the deal product',
	},

	// ----------------------------------
	//         dealProduct: create — required fields
	// ----------------------------------
	{
		displayName: 'Product ID',
		name: 'product_id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['dealProduct'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the product to add to the deal',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['dealProduct'],
				operation: ['create'],
			},
		},
		default: 1,
		description: 'Quantity of the product',
	},
	{
		displayName: 'Price',
		name: 'price',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['dealProduct'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'Unit price of the product',
	},

	// ----------------------------------
	//    dealProduct: create / update — Additional Fields
	// ----------------------------------
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['dealProduct'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Discount',
				name: 'discount',
				type: 'number',
				default: 0,
				description: 'Discount value applied to the product',
			},
			{
				displayName: 'Discount Type',
				name: 'discount_type',
				type: 'options',
				options: [
					{
						name: 'Percentage',
						value: 'percentage',
					},
					{
						name: 'Fixed Value',
						value: 'value',
					},
				],
				default: 'percentage',
				description: 'Type of discount applied',
			},
		],
	},
];
