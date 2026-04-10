import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

import { rdStationCrmApiRequest, rdStationCrmApiRequestAllItems, cleanData } from './GenericFunctions';
import { dealOperations, dealFields } from './descriptions/DealDescription';
import { contactOperations, contactFields } from './descriptions/ContactDescription';
import { organizationOperations, organizationFields } from './descriptions/OrganizationDescription';
import { taskOperations, taskFields } from './descriptions/TaskDescription';
import { productOperations, productFields } from './descriptions/ProductDescription';
import { dealProductOperations, dealProductFields } from './descriptions/DealProductDescription';
import { activityOperations, activityFields } from './descriptions/ActivityDescription';
import { customFieldOperations, customFieldFields } from './descriptions/CustomFieldDescription';
import { dealPipelineOperations, dealPipelineFields } from './descriptions/DealPipelineDescription';
import { dealStageOperations, dealStageFields } from './descriptions/DealStageDescription';
import { campaignOperations, campaignFields } from './descriptions/CampaignDescription';
import { sourceOperations, sourceFields } from './descriptions/SourceDescription';
import { lostReasonOperations, lostReasonFields } from './descriptions/LostReasonDescription';
import { userOperations, userFields } from './descriptions/UserDescription';
import { teamOperations, teamFields } from './descriptions/TeamDescription';

export class RdStationCrm implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'RD Station CRM',
		name: 'rdStationCrm',
		icon: 'file:rdstation.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Manage RD Station CRM data',
		defaults: {
			name: 'RD Station CRM',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'rdStationCrmApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Activity',
						value: 'activity',
					},
					{
						name: 'Campaign',
						value: 'campaign',
					},
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Custom Field',
						value: 'customField',
					},
					{
						name: 'Deal',
						value: 'deal',
					},
					{
						name: 'Deal Pipeline',
						value: 'dealPipeline',
					},
					{
						name: 'Deal Product',
						value: 'dealProduct',
					},
					{
						name: 'Deal Stage',
						value: 'dealStage',
					},
					{
						name: 'Lost Reason',
						value: 'lostReason',
					},
					{
						name: 'Organization',
						value: 'organization',
					},
					{
						name: 'Product',
						value: 'product',
					},
					{
						name: 'Source',
						value: 'source',
					},
					{
						name: 'Task',
						value: 'task',
					},
					{
						name: 'Team',
						value: 'team',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'deal',
			},
			...dealOperations,
			...dealFields,
			...contactOperations,
			...contactFields,
			...organizationOperations,
			...organizationFields,
			...taskOperations,
			...taskFields,
			...productOperations,
			...productFields,
			...dealProductOperations,
			...dealProductFields,
			...activityOperations,
			...activityFields,
			...customFieldOperations,
			...customFieldFields,
			...dealPipelineOperations,
			...dealPipelineFields,
			...dealStageOperations,
			...dealStageFields,
			...campaignOperations,
			...campaignFields,
			...sourceOperations,
			...sourceFields,
			...lostReasonOperations,
			...lostReasonFields,
			...userOperations,
			...userFields,
			...teamOperations,
			...teamFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: any;

				if (resource === 'deal') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body = cleanData({ name, ...additionalFields });
						responseData = await rdStationCrmApiRequest.call(this, 'POST', '/deals', body);
						responseData = responseData.deal ?? responseData;
					} else if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;
						const response = await rdStationCrmApiRequest.call(this, 'GET', `/deals/${id}`);
						responseData = response.deal ?? response;
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						if (returnAll) {
							responseData = await rdStationCrmApiRequestAllItems.call(
								this,
								'deals',
								'GET',
								'/deals',
								{},
								filters,
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await rdStationCrmApiRequest.call(
								this,
								'GET',
								'/deals',
								{},
								{ ...filters, limit },
							);
							responseData = response.deals ?? [];
						}
					} else if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body = cleanData({ ...additionalFields });
						if (Object.keys(body).length === 0) {
							throw new NodeOperationError(
								this.getNode(),
								'At least one field must be provided to update a deal.',
								{ itemIndex: i },
							);
						}
						responseData = await rdStationCrmApiRequest.call(this, 'PUT', `/deals/${id}`, body);
						responseData = responseData.deal ?? responseData;
					}
				} else if (resource === 'contact') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const emails = (additionalFields.emails as IDataObject)?.emailValues as IDataObject[] ?? [];
						const phones = (additionalFields.phones as IDataObject)?.phoneValues as IDataObject[] ?? [];
						const { emails: _ce, phones: _cp, ...restCreate } = additionalFields;
						const body = cleanData({
							name,
							...restCreate,
							emails: emails.length > 0 ? emails : undefined,
							phones: phones.length > 0 ? phones : undefined,
						});
						responseData = await rdStationCrmApiRequest.call(this, 'POST', '/contacts', body);
						responseData = responseData.contact ?? responseData;
					} else if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;
						const response = await rdStationCrmApiRequest.call(this, 'GET', `/contacts/${id}`);
						responseData = response.contact ?? response;
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						if (returnAll) {
							responseData = await rdStationCrmApiRequestAllItems.call(
								this,
								'contacts',
								'GET',
								'/contacts',
								{},
								filters,
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await rdStationCrmApiRequest.call(
								this,
								'GET',
								'/contacts',
								{},
								{ ...filters, limit },
							);
							responseData = response.contacts ?? [];
						}
					} else if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const emails = (additionalFields.emails as IDataObject)?.emailValues as IDataObject[] ?? [];
						const phones = (additionalFields.phones as IDataObject)?.phoneValues as IDataObject[] ?? [];
						const { emails: _ue, phones: _up, ...restUpdate } = additionalFields;
						const body = cleanData({
							...restUpdate,
							emails: emails.length > 0 ? emails : undefined,
							phones: phones.length > 0 ? phones : undefined,
						});
						if (Object.keys(body).length === 0) {
							throw new NodeOperationError(
								this.getNode(),
								'At least one field must be provided to update a contact.',
								{ itemIndex: i },
							);
						}
						responseData = await rdStationCrmApiRequest.call(this, 'PUT', `/contacts/${id}`, body);
						responseData = responseData.contact ?? responseData;
					}
				} else if (resource === 'organization') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body = cleanData({ name, ...additionalFields });
						responseData = await rdStationCrmApiRequest.call(this, 'POST', '/organizations', body);
						responseData = responseData.organization ?? responseData;
					} else if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;
						const response = await rdStationCrmApiRequest.call(this, 'GET', `/organizations/${id}`);
						responseData = response.organization ?? response;
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						if (returnAll) {
							responseData = await rdStationCrmApiRequestAllItems.call(
								this,
								'organizations',
								'GET',
								'/organizations',
								{},
								filters,
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await rdStationCrmApiRequest.call(
								this,
								'GET',
								'/organizations',
								{},
								{ ...filters, limit },
							);
							responseData = response.organizations ?? [];
						}
					} else if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body = cleanData({ ...additionalFields });
						if (Object.keys(body).length === 0) {
							throw new NodeOperationError(
								this.getNode(),
								'At least one field must be provided to update an organization.',
								{ itemIndex: i },
							);
						}
						responseData = await rdStationCrmApiRequest.call(this, 'PUT', `/organizations/${id}`, body);
						responseData = responseData.organization ?? responseData;
					}
				} else if (resource === 'task') {
					if (operation === 'create') {
						const subject = this.getNodeParameter('subject', i) as string;
						const type = this.getNodeParameter('type', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body = cleanData({ subject, type, ...additionalFields });
						responseData = await rdStationCrmApiRequest.call(this, 'POST', '/tasks', body);
						responseData = responseData.task ?? responseData;
					} else if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;
						const response = await rdStationCrmApiRequest.call(this, 'GET', `/tasks/${id}`);
						responseData = response.task ?? response;
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						if (returnAll) {
							responseData = await rdStationCrmApiRequestAllItems.call(
								this,
								'tasks',
								'GET',
								'/tasks',
								{},
								filters,
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await rdStationCrmApiRequest.call(
								this,
								'GET',
								'/tasks',
								{},
								{ ...filters, limit },
							);
							responseData = response.tasks ?? [];
						}
					} else if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body = cleanData({ ...additionalFields });
						if (Object.keys(body).length === 0) {
							throw new NodeOperationError(
								this.getNode(),
								'At least one field must be provided to update a task.',
								{ itemIndex: i },
							);
						}
						responseData = await rdStationCrmApiRequest.call(this, 'PUT', `/tasks/${id}`, body);
						responseData = responseData.task ?? responseData;
					}
				} else if (resource === 'product') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body = cleanData({ name, ...additionalFields });
						responseData = await rdStationCrmApiRequest.call(this, 'POST', '/products', body);
						responseData = responseData.product ?? responseData;
					} else if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;
						const response = await rdStationCrmApiRequest.call(this, 'GET', `/products/${id}`);
						responseData = response.product ?? response;
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						if (returnAll) {
							responseData = await rdStationCrmApiRequestAllItems.call(
								this,
								'products',
								'GET',
								'/products',
								{},
								filters,
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await rdStationCrmApiRequest.call(
								this,
								'GET',
								'/products',
								{},
								{ ...filters, limit },
							);
							responseData = response.products ?? [];
						}
					} else if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body = cleanData({ ...additionalFields });
						if (Object.keys(body).length === 0) {
							throw new NodeOperationError(
								this.getNode(),
								'At least one field must be provided to update a product.',
								{ itemIndex: i },
							);
						}
						responseData = await rdStationCrmApiRequest.call(this, 'PUT', `/products/${id}`, body);
						responseData = responseData.product ?? responseData;
					}
				} else if (resource === 'dealProduct') {
					if (operation === 'create') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						const product_id = this.getNodeParameter('product_id', i) as string;
						const amount = this.getNodeParameter('amount', i) as number;
						const price = this.getNodeParameter('price', i) as number;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body = cleanData({ product_id, amount, price, ...additionalFields });
						responseData = await rdStationCrmApiRequest.call(this, 'POST', `/deals/${dealId}/products`, body);
						responseData = responseData.deal_product ?? responseData;
					} else if (operation === 'getAll') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						// No pagination: API v1 returns all products for a deal in a single call
						const response = await rdStationCrmApiRequest.call(this, 'GET', `/deals/${dealId}/products`);
						responseData = response.deal_products ?? [];
					} else if (operation === 'update') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body = cleanData({ ...additionalFields });
						if (Object.keys(body).length === 0) {
							throw new NodeOperationError(
								this.getNode(),
								'At least one field must be provided to update a deal product.',
								{ itemIndex: i },
							);
						}
						responseData = await rdStationCrmApiRequest.call(this, 'PUT', `/deals/${dealId}/products/${id}`, body);
						responseData = responseData.deal_product ?? responseData;
					} else if (operation === 'delete') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						const id = this.getNodeParameter('id', i) as string;
						await rdStationCrmApiRequest.call(this, 'DELETE', `/deals/${dealId}/products/${id}`);
						responseData = { success: true };
					}
				} else if (resource === 'activity') {
					if (operation === 'create') {
						const deal_id = this.getNodeParameter('deal_id', i) as string;
						const notes = this.getNodeParameter('notes', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body = cleanData({ deal_id, notes, ...additionalFields });
						responseData = await rdStationCrmApiRequest.call(this, 'POST', '/activities', body);
						responseData = responseData.activity ?? responseData;
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						if (returnAll) {
							responseData = await rdStationCrmApiRequestAllItems.call(
								this,
								'activities',
								'GET',
								'/activities',
								{},
								filters,
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await rdStationCrmApiRequest.call(
								this,
								'GET',
								'/activities',
								{},
								{ ...filters, limit },
							);
							responseData = response.activities ?? [];
						}
					}
				} else if (resource === 'customField') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const entity = this.getNodeParameter('entity', i) as string;
						const field_type = this.getNodeParameter('field_type', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body = cleanData({ name, entity, field_type, ...additionalFields });
						responseData = await rdStationCrmApiRequest.call(this, 'POST', '/custom_fields', body);
						responseData = responseData.custom_field ?? responseData;
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('id', i) as string;
						await rdStationCrmApiRequest.call(this, 'DELETE', `/custom_fields/${id}`);
						responseData = { success: true };
					} else if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;
						const response = await rdStationCrmApiRequest.call(this, 'GET', `/custom_fields/${id}`);
						responseData = response.custom_field ?? response;
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						if (returnAll) {
							responseData = await rdStationCrmApiRequestAllItems.call(this, 'custom_fields', 'GET', '/custom_fields', {}, filters);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await rdStationCrmApiRequest.call(this, 'GET', '/custom_fields', {}, { ...filters, limit });
							responseData = response.custom_fields ?? [];
						}
					} else if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body = cleanData({ ...additionalFields });
						if (Object.keys(body).length === 0) {
							throw new NodeOperationError(this.getNode(), 'At least one field must be provided to update a custom field.', { itemIndex: i });
						}
						responseData = await rdStationCrmApiRequest.call(this, 'PUT', `/custom_fields/${id}`, body);
						responseData = responseData.custom_field ?? responseData;
					}
				} else if (resource === 'dealPipeline') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const body = cleanData({ name });
						responseData = await rdStationCrmApiRequest.call(this, 'POST', '/deal_pipelines', body);
						responseData = responseData.deal_pipeline ?? responseData;
					} else if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;
						const response = await rdStationCrmApiRequest.call(this, 'GET', `/deal_pipelines/${id}`);
						responseData = response.deal_pipeline ?? response;
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (returnAll) {
							responseData = await rdStationCrmApiRequestAllItems.call(this, 'deal_pipelines', 'GET', '/deal_pipelines', {}, {});
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await rdStationCrmApiRequest.call(this, 'GET', '/deal_pipelines', {}, { limit });
							responseData = response.deal_pipelines ?? [];
						}
					} else if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body = cleanData({ ...additionalFields });
						if (Object.keys(body).length === 0) {
							throw new NodeOperationError(this.getNode(), 'At least one field must be provided to update a deal pipeline.', { itemIndex: i });
						}
						responseData = await rdStationCrmApiRequest.call(this, 'PUT', `/deal_pipelines/${id}`, body);
						responseData = responseData.deal_pipeline ?? responseData;
					}
				} else if (resource === 'dealStage') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const deal_pipeline_id = this.getNodeParameter('deal_pipeline_id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body = cleanData({ name, deal_pipeline_id, ...additionalFields });
						responseData = await rdStationCrmApiRequest.call(this, 'POST', '/deal_stages', body);
						responseData = responseData.deal_stage ?? responseData;
					} else if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;
						const response = await rdStationCrmApiRequest.call(this, 'GET', `/deal_stages/${id}`);
						responseData = response.deal_stage ?? response;
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						if (returnAll) {
							responseData = await rdStationCrmApiRequestAllItems.call(this, 'deal_stages', 'GET', '/deal_stages', {}, filters);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await rdStationCrmApiRequest.call(this, 'GET', '/deal_stages', {}, { ...filters, limit });
							responseData = response.deal_stages ?? [];
						}
					} else if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body = cleanData({ ...additionalFields });
						if (Object.keys(body).length === 0) {
							throw new NodeOperationError(this.getNode(), 'At least one field must be provided to update a deal stage.', { itemIndex: i });
						}
						responseData = await rdStationCrmApiRequest.call(this, 'PUT', `/deal_stages/${id}`, body);
						responseData = responseData.deal_stage ?? responseData;
					}
				} else if (resource === 'campaign') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const body = cleanData({ name });
						responseData = await rdStationCrmApiRequest.call(this, 'POST', '/campaigns', body);
						responseData = responseData.campaign ?? responseData;
					} else if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;
						const response = await rdStationCrmApiRequest.call(this, 'GET', `/campaigns/${id}`);
						responseData = response.campaign ?? response;
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						if (returnAll) {
							responseData = await rdStationCrmApiRequestAllItems.call(this, 'campaigns', 'GET', '/campaigns', {}, filters);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await rdStationCrmApiRequest.call(this, 'GET', '/campaigns', {}, { ...filters, limit });
							responseData = response.campaigns ?? [];
						}
					} else if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body = cleanData({ ...additionalFields });
						if (Object.keys(body).length === 0) {
							throw new NodeOperationError(this.getNode(), 'At least one field must be provided to update a campaign.', { itemIndex: i });
						}
						responseData = await rdStationCrmApiRequest.call(this, 'PUT', `/campaigns/${id}`, body);
						responseData = responseData.campaign ?? responseData;
					}
				} else if (resource === 'source') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const body = cleanData({ name });
						responseData = await rdStationCrmApiRequest.call(this, 'POST', '/deal_sources', body);
						responseData = responseData.deal_source ?? responseData;
					} else if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;
						const response = await rdStationCrmApiRequest.call(this, 'GET', `/deal_sources/${id}`);
						responseData = response.deal_source ?? response;
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						if (returnAll) {
							responseData = await rdStationCrmApiRequestAllItems.call(this, 'deal_sources', 'GET', '/deal_sources', {}, filters);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await rdStationCrmApiRequest.call(this, 'GET', '/deal_sources', {}, { ...filters, limit });
							responseData = response.deal_sources ?? [];
						}
					} else if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body = cleanData({ ...additionalFields });
						if (Object.keys(body).length === 0) {
							throw new NodeOperationError(this.getNode(), 'At least one field must be provided to update a source.', { itemIndex: i });
						}
						responseData = await rdStationCrmApiRequest.call(this, 'PUT', `/deal_sources/${id}`, body);
						responseData = responseData.deal_source ?? responseData;
					}
				} else if (resource === 'lostReason') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const body = cleanData({ name });
						responseData = await rdStationCrmApiRequest.call(this, 'POST', '/deal_lost_reasons', body);
						responseData = responseData.deal_lost_reason ?? responseData;
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						if (returnAll) {
							responseData = await rdStationCrmApiRequestAllItems.call(this, 'deal_lost_reasons', 'GET', '/deal_lost_reasons', {}, filters);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await rdStationCrmApiRequest.call(this, 'GET', '/deal_lost_reasons', {}, { ...filters, limit });
							responseData = response.deal_lost_reasons ?? [];
						}
					}
				} else if (resource === 'user') {
					if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;
						const response = await rdStationCrmApiRequest.call(this, 'GET', `/users/${id}`);
						responseData = response.user ?? response;
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (returnAll) {
							responseData = await rdStationCrmApiRequestAllItems.call(this, 'users', 'GET', '/users', {}, {});
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await rdStationCrmApiRequest.call(this, 'GET', '/users', {}, { limit });
							responseData = response.users ?? [];
						}
					}
				} else if (resource === 'team') {
					if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;
						const response = await rdStationCrmApiRequest.call(this, 'GET', `/teams/${id}`);
						responseData = response.team ?? response;
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (returnAll) {
							responseData = await rdStationCrmApiRequestAllItems.call(this, 'teams', 'GET', '/teams', {}, {});
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await rdStationCrmApiRequest.call(this, 'GET', '/teams', {}, { limit });
							responseData = response.teams ?? [];
						}
					}
				} else {
					throw new NodeOperationError(
						this.getNode(),
						`Resource "${resource}" is not supported yet.`,
					);
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(Array.isArray(responseData) ? responseData : [responseData]),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
