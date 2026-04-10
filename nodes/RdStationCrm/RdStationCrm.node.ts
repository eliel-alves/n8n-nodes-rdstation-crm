import {
	IDataObject,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodeListSearchResult,
	INodePropertyOptions,
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
		icon: 'file:rdstation-crm-logo.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Gerencie dados do RD Station CRM',
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
				displayName: 'Recurso',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Atividade', value: 'activity' },
					{ name: 'Campanha', value: 'campaign' },
					{ name: 'Campo Personalizado', value: 'customField' },
					{ name: 'Contato', value: 'contact' },
					{ name: 'Empresa', value: 'organization' },
					{ name: 'Equipe', value: 'team' },
					{ name: 'Etapa do Funil', value: 'dealStage' },
					{ name: 'Fonte', value: 'source' },
					{ name: 'Funil de Vendas', value: 'dealPipeline' },
					{ name: 'Motivo de Perda', value: 'lostReason' },
					{ name: 'Negociação', value: 'deal' },
					{ name: 'Produto', value: 'product' },
					{ name: 'Produto da Negociação', value: 'dealProduct' },
					{ name: 'Tarefa', value: 'task' },
					{ name: 'Usuário', value: 'user' },
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

	methods = {
		loadOptions: {
			async getPipelines(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await rdStationCrmApiRequest.call(this, 'GET', '/deal_pipelines', {}, { limit: 200 });
				const pipelines = Array.isArray(response) ? response : (response.deal_pipelines ?? []);
				return pipelines.map((p: IDataObject) => ({
					name: p.name as string,
					value: (p._id ?? p.id) as string,
				}));
			},
			async getStages(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const pipelineId = this.getCurrentNodeParameter('deal_pipeline_id') as string;
				if (pipelineId) {
					// Buscar stages do pipeline selecionado (já vêm embutidos na resposta do pipeline)
					const pipelineResponse = await rdStationCrmApiRequest.call(this, 'GET', `/deal_pipelines/${pipelineId}`);
					const pipeline = pipelineResponse.deal_pipeline ?? pipelineResponse;
					const stages = (pipeline.deal_stages ?? []) as IDataObject[];
					return stages.map((s: IDataObject) => ({
						name: s.name as string,
						value: (s._id ?? s.id) as string,
					}));
				}
				// Sem pipeline selecionado, buscar todos os stages
				const response = await rdStationCrmApiRequest.call(this, 'GET', '/deal_stages', {}, { limit: 200 });
				const stages = Array.isArray(response) ? response : (response.deal_stages ?? []);
				return stages.map((s: IDataObject) => ({
					name: s.name as string,
					value: (s._id ?? s.id) as string,
				}));
			},
			async getUsers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await rdStationCrmApiRequest.call(this, 'GET', '/users', {}, { limit: 200 });
				const items = Array.isArray(response) ? response : (response.users ?? []);
				return items.map((u: IDataObject) => ({
					name: u.name as string,
					value: (u._id ?? u.id) as string,
					description: (u.email as string) || undefined,
				}));
			},
			async getCampaigns(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await rdStationCrmApiRequest.call(this, 'GET', '/campaigns', {}, { limit: 200 });
				const items = Array.isArray(response) ? response : (response.campaigns ?? []);
				return items.map((c: IDataObject) => ({
					name: c.name as string,
					value: (c._id ?? c.id) as string,
				}));
			},
			async getSources(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await rdStationCrmApiRequest.call(this, 'GET', '/deal_sources', {}, { limit: 200 });
				const items = Array.isArray(response) ? response : (response.deal_sources ?? []);
				return items.map((s: IDataObject) => ({
					name: s.name as string,
					value: (s._id ?? s.id) as string,
				}));
			},
			async getLostReasons(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await rdStationCrmApiRequest.call(this, 'GET', '/deal_lost_reasons', {}, { limit: 200 });
				const items = Array.isArray(response) ? response : (response.deal_lost_reasons ?? []);
				return items.map((r: IDataObject) => ({
					name: r.name as string,
					value: (r._id ?? r.id) as string,
				}));
			},
			async getProducts(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await rdStationCrmApiRequest.call(this, 'GET', '/products', {}, { limit: 200 });
				const items = Array.isArray(response) ? response : (response.products ?? []);
				return items.map((p: IDataObject) => ({
					name: p.name as string,
					value: (p._id ?? p.id) as string,
				}));
			},
			async getDealCustomFields(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await rdStationCrmApiRequest.call(this, 'GET', '/custom_fields', {}, { for: 'deal', limit: 200 });
				const items = Array.isArray(response) ? response : (response.custom_fields ?? []);
				return items.map((f: IDataObject) => ({
					name: (f.label ?? f.name) as string,
					value: (f._id ?? f.id) as string,
				}));
			},
			async getContactCustomFields(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await rdStationCrmApiRequest.call(this, 'GET', '/custom_fields', {}, { for: 'contact', limit: 200 });
				const items = Array.isArray(response) ? response : (response.custom_fields ?? []);
				return items.map((f: IDataObject) => ({
					name: (f.label ?? f.name) as string,
					value: (f._id ?? f.id) as string,
				}));
			},
			async getOrganizationCustomFields(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await rdStationCrmApiRequest.call(this, 'GET', '/custom_fields', {}, { for: 'organization', limit: 200 });
				const items = Array.isArray(response) ? response : (response.custom_fields ?? []);
				return items.map((f: IDataObject) => ({
					name: (f.label ?? f.name) as string,
					value: (f._id ?? f.id) as string,
				}));
			},
			async getProductCustomFields(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await rdStationCrmApiRequest.call(this, 'GET', '/custom_fields', {}, { for: 'product', limit: 200 });
				const items = Array.isArray(response) ? response : (response.custom_fields ?? []);
				return items.map((f: IDataObject) => ({
					name: (f.label ?? f.name) as string,
					value: (f._id ?? f.id) as string,
				}));
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		function extractCustomFields(raw: IDataObject): IDataObject[] {
			const entries = (raw.customFieldValues as IDataObject[] | undefined) ?? [];
			return entries
				.filter((e) => e.custom_field_id)
				.map((e) => ({ custom_field_id: e.custom_field_id, value: e.value ?? '' }));
		}

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: any;

				// ─── DEAL ───────────────────────────────────────────────────────────
				if (resource === 'deal') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const deal_pipeline_id = this.getNodeParameter('deal_pipeline_id', i, '') as string;
						const deal_stage_id = this.getNodeParameter('deal_stage_id', i, '') as string;
						const user_id = this.getNodeParameter('user_id', i, '') as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						const dealCustomFieldsRaw = this.getNodeParameter('deal_custom_fields', i, {}) as IDataObject;
						const deal_custom_fields = extractCustomFields(dealCustomFieldsRaw);

						const { campaign_id, deal_source_id, deal_lost_reason_id, contact_id, ...restAdditional } = additionalFields;

						const dealBody = cleanData({
							name,
							deal_pipeline_id: deal_pipeline_id || undefined,
							deal_stage_id: deal_stage_id || undefined,
							user_id: user_id || undefined,
							deal_lost_reason_id: deal_lost_reason_id || undefined,
							...restAdditional,
							...(deal_custom_fields.length > 0 ? { deal_custom_fields } : {}),
						});

						const fullBody: IDataObject = { deal: dealBody };
						if (campaign_id) fullBody.campaign = { _id: campaign_id };
						if (deal_source_id) fullBody.deal_source = { _id: deal_source_id };
						if (contact_id) fullBody.contacts = [{ _id: contact_id }];

						responseData = await rdStationCrmApiRequest.call(this, 'POST', '/deals', fullBody);
						responseData = responseData.deal ?? responseData;

					} else if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;
						const response = await rdStationCrmApiRequest.call(this, 'GET', `/deals/${id}`);
						responseData = response.deal ?? response;

					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						if (returnAll) {
							responseData = await rdStationCrmApiRequestAllItems.call(this, 'deals', 'GET', '/deals', {}, filters);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await rdStationCrmApiRequest.call(this, 'GET', '/deals', {}, { ...filters, limit });
							responseData = response.deals ?? [];
						}

					} else if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const deal_pipeline_id = this.getNodeParameter('deal_pipeline_id', i, '') as string;
						const deal_stage_id = this.getNodeParameter('deal_stage_id', i, '') as string;
						const user_id = this.getNodeParameter('user_id', i, '') as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						const dealCustomFieldsRaw = this.getNodeParameter('deal_custom_fields', i, {}) as IDataObject;
						const deal_custom_fields = extractCustomFields(dealCustomFieldsRaw);
						const { campaign_id, deal_source_id, contact_id, ...restAdditional } = additionalFields;

						const dealBody = cleanData({
							deal_pipeline_id: deal_pipeline_id || undefined,
							deal_stage_id: deal_stage_id || undefined,
							user_id: user_id || undefined,
							...restAdditional,
							...(deal_custom_fields.length > 0 ? { deal_custom_fields } : {}),
						});

						const fullBody: IDataObject = { deal: dealBody };
						if (campaign_id) fullBody.campaign = { _id: campaign_id };
						if (deal_source_id) fullBody.deal_source = { _id: deal_source_id };
						if (contact_id) fullBody.contacts = [{ _id: contact_id }];

						if (Object.keys(dealBody).length === 0 && !campaign_id && !deal_source_id && !contact_id) {
							throw new NodeOperationError(this.getNode(), 'Pelo menos um campo deve ser fornecido para atualizar a negociação.', { itemIndex: i });
						}
						responseData = await rdStationCrmApiRequest.call(this, 'PUT', `/deals/${id}`, fullBody);
						responseData = responseData.deal ?? responseData;
					}

				// ─── CONTACT ─────────────────────────────────────────────────────────
				} else if (resource === 'contact') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						const contactCustomFieldsRaw = this.getNodeParameter('contact_custom_fields', i, {}) as IDataObject;
						const contact_custom_fields = extractCustomFields(contactCustomFieldsRaw);

						const emails = (additionalFields.emails as IDataObject)?.emailValues as IDataObject[] ?? [];
						const phones = (additionalFields.phones as IDataObject)?.phoneValues as IDataObject[] ?? [];
						const birthdayRaw = (additionalFields.birthday as IDataObject)?.birthdayValues as IDataObject | undefined;
						const birthday = birthdayRaw ? { day: birthdayRaw.day, month: birthdayRaw.month, year: birthdayRaw.year } : undefined;
						const { emails: _ce, phones: _cp, birthday: _cb, ...restCreate } = additionalFields;

						const contactBody = cleanData({
							name,
							...restCreate,
							emails: emails.length > 0 ? emails : undefined,
							phones: phones.length > 0 ? phones : undefined,
							birthday: birthday || undefined,
							...(contact_custom_fields.length > 0 ? { contact_custom_fields } : {}),
						});

						responseData = await rdStationCrmApiRequest.call(this, 'POST', '/contacts', { contact: contactBody });
						responseData = responseData.contact ?? responseData;

					} else if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;
						const response = await rdStationCrmApiRequest.call(this, 'GET', `/contacts/${id}`);
						responseData = response.contact ?? response;

					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						if (returnAll) {
							responseData = await rdStationCrmApiRequestAllItems.call(this, 'contacts', 'GET', '/contacts', {}, filters);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await rdStationCrmApiRequest.call(this, 'GET', '/contacts', {}, { ...filters, limit });
							responseData = response.contacts ?? [];
						}

					} else if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						const contactCustomFieldsRaw = this.getNodeParameter('contact_custom_fields', i, {}) as IDataObject;
						const contact_custom_fields = extractCustomFields(contactCustomFieldsRaw);

						const emails = (additionalFields.emails as IDataObject)?.emailValues as IDataObject[] ?? [];
						const phones = (additionalFields.phones as IDataObject)?.phoneValues as IDataObject[] ?? [];
						const birthdayRaw = (additionalFields.birthday as IDataObject)?.birthdayValues as IDataObject | undefined;
						const birthday = birthdayRaw ? { day: birthdayRaw.day, month: birthdayRaw.month, year: birthdayRaw.year } : undefined;
						const { emails: _ue, phones: _up, birthday: _ub, ...restUpdate } = additionalFields;

						const contactBody = cleanData({
							...restUpdate,
							emails: emails.length > 0 ? emails : undefined,
							phones: phones.length > 0 ? phones : undefined,
							birthday: birthday || undefined,
							...(contact_custom_fields.length > 0 ? { contact_custom_fields } : {}),
						});

						if (Object.keys(contactBody).length === 0) {
							throw new NodeOperationError(this.getNode(), 'Pelo menos um campo deve ser fornecido para atualizar o contato.', { itemIndex: i });
						}
						responseData = await rdStationCrmApiRequest.call(this, 'PUT', `/contacts/${id}`, { contact: contactBody });
						responseData = responseData.contact ?? responseData;
					}

				// ─── ORGANIZATION ─────────────────────────────────────────────────────
				} else if (resource === 'organization') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						const orgCustomFieldsRaw = this.getNodeParameter('organization_custom_fields', i, {}) as IDataObject;
						const organization_custom_fields = extractCustomFields(orgCustomFieldsRaw);

						const orgBody = cleanData({
							name,
							...additionalFields,
							...(organization_custom_fields.length > 0 ? { organization_custom_fields } : {}),
						});
						responseData = await rdStationCrmApiRequest.call(this, 'POST', '/organizations', { organization: orgBody });
						responseData = responseData.organization ?? responseData;

					} else if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;
						const response = await rdStationCrmApiRequest.call(this, 'GET', `/organizations/${id}`);
						responseData = response.organization ?? response;

					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						if (returnAll) {
							responseData = await rdStationCrmApiRequestAllItems.call(this, 'organizations', 'GET', '/organizations', {}, filters);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await rdStationCrmApiRequest.call(this, 'GET', '/organizations', {}, { ...filters, limit });
							responseData = response.organizations ?? [];
						}

					} else if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						const orgCustomFieldsRaw = this.getNodeParameter('organization_custom_fields', i, {}) as IDataObject;
						const organization_custom_fields = extractCustomFields(orgCustomFieldsRaw);

						const orgBody = cleanData({
							...additionalFields,
							...(organization_custom_fields.length > 0 ? { organization_custom_fields } : {}),
						});
						if (Object.keys(orgBody).length === 0) {
							throw new NodeOperationError(this.getNode(), 'Pelo menos um campo deve ser fornecido para atualizar a empresa.', { itemIndex: i });
						}
						responseData = await rdStationCrmApiRequest.call(this, 'PUT', `/organizations/${id}`, { organization: orgBody });
						responseData = responseData.organization ?? responseData;
					}

				// ─── TASK ─────────────────────────────────────────────────────────────
				} else if (resource === 'task') {
					if (operation === 'create') {
						const subject = this.getNodeParameter('subject', i) as string;
						const type = this.getNodeParameter('type', i) as string;
						const deal_id = this.getNodeParameter('deal_id', i) as string;
						const user_id = this.getNodeParameter('user_id', i) as string;
						const date = this.getNodeParameter('date', i) as string;
						const hour = this.getNodeParameter('hour', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const taskBody = cleanData({
							subject,
							type,
							deal_id,
							user_ids: [user_id],
							date,
							hour,
							...additionalFields,
						});
						responseData = await rdStationCrmApiRequest.call(this, 'POST', '/tasks', { task: taskBody });
						responseData = responseData.task ?? responseData;

					} else if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;
						const response = await rdStationCrmApiRequest.call(this, 'GET', `/tasks/${id}`);
						responseData = response.task ?? response;

					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						if (returnAll) {
							responseData = await rdStationCrmApiRequestAllItems.call(this, 'tasks', 'GET', '/tasks', {}, filters);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await rdStationCrmApiRequest.call(this, 'GET', '/tasks', {}, { ...filters, limit });
							responseData = response.tasks ?? [];
						}

					} else if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const { user_id, ...restAdditional } = additionalFields;
						const taskUpdateBody = cleanData({
							...restAdditional,
							...(user_id ? { user_ids: [user_id] } : {}),
						});

						if (Object.keys(taskUpdateBody).length === 0) {
							throw new NodeOperationError(this.getNode(), 'Pelo menos um campo deve ser fornecido para atualizar a tarefa.', { itemIndex: i });
						}
						responseData = await rdStationCrmApiRequest.call(this, 'PUT', `/tasks/${id}`, { task: taskUpdateBody });
						responseData = responseData.task ?? responseData;
					}

				// ─── PRODUCT ──────────────────────────────────────────────────────────
				} else if (resource === 'product') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						const productCustomFieldsRaw = this.getNodeParameter('product_custom_fields', i, {}) as IDataObject;
						const product_custom_fields = extractCustomFields(productCustomFieldsRaw);

						const productBody = cleanData({
							name,
							...additionalFields,
							...(product_custom_fields.length > 0 ? { product_custom_fields } : {}),
						});
						responseData = await rdStationCrmApiRequest.call(this, 'POST', '/products', { product: productBody });
						responseData = responseData.product ?? responseData;

					} else if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;
						const response = await rdStationCrmApiRequest.call(this, 'GET', `/products/${id}`);
						responseData = response.product ?? response;

					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						if (returnAll) {
							responseData = await rdStationCrmApiRequestAllItems.call(this, 'products', 'GET', '/products', {}, filters);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await rdStationCrmApiRequest.call(this, 'GET', '/products', {}, { ...filters, limit });
							responseData = response.products ?? [];
						}

					} else if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						const productCustomFieldsRaw = this.getNodeParameter('product_custom_fields', i, {}) as IDataObject;
						const product_custom_fields = extractCustomFields(productCustomFieldsRaw);

						const productBody = cleanData({
							...additionalFields,
							...(product_custom_fields.length > 0 ? { product_custom_fields } : {}),
						});
						if (Object.keys(productBody).length === 0) {
							throw new NodeOperationError(this.getNode(), 'Pelo menos um campo deve ser fornecido para atualizar o produto.', { itemIndex: i });
						}
						responseData = await rdStationCrmApiRequest.call(this, 'PUT', `/products/${id}`, { product: productBody });
						responseData = responseData.product ?? responseData;
					}

				// ─── DEAL PRODUCT ─────────────────────────────────────────────────────
				} else if (resource === 'dealProduct') {
					if (operation === 'create') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						const product_id = this.getNodeParameter('product_id', i) as string;
						const amount = this.getNodeParameter('amount', i) as number;
						const price = this.getNodeParameter('price', i) as number;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						const body = cleanData({ product_id, amount, price, ...additionalFields });
						responseData = await rdStationCrmApiRequest.call(this, 'POST', `/deals/${dealId}/deal_products`, body);
						responseData = responseData.deal_product ?? responseData;

					} else if (operation === 'getAll') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						const response = await rdStationCrmApiRequest.call(this, 'GET', `/deals/${dealId}/deal_products`);
						responseData = response.deal_products ?? [];

					} else if (operation === 'update') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						const body = cleanData({ ...additionalFields });
						if (Object.keys(body).length === 0) {
							throw new NodeOperationError(this.getNode(), 'Pelo menos um campo deve ser fornecido para atualizar o produto da negociação.', { itemIndex: i });
						}
						responseData = await rdStationCrmApiRequest.call(this, 'PUT', `/deals/${dealId}/deal_products/${id}`, body);
						responseData = responseData.deal_product ?? responseData;

					} else if (operation === 'delete') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						const id = this.getNodeParameter('id', i) as string;
						await rdStationCrmApiRequest.call(this, 'DELETE', `/deals/${dealId}/deal_products/${id}`);
						responseData = { success: true };
					}

				// ─── ACTIVITY ─────────────────────────────────────────────────────────
				} else if (resource === 'activity') {
					if (operation === 'create') {
						const deal_id = this.getNodeParameter('deal_id', i) as string;
						const text = this.getNodeParameter('text', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						const activityBody = cleanData({ deal_id, text, ...additionalFields });
						responseData = await rdStationCrmApiRequest.call(this, 'POST', '/activities', { activity: activityBody });
						responseData = responseData.activity ?? responseData;

					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						if (returnAll) {
							responseData = await rdStationCrmApiRequestAllItems.call(this, 'activities', 'GET', '/activities', {}, filters);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await rdStationCrmApiRequest.call(this, 'GET', '/activities', {}, { ...filters, limit });
							responseData = response.activities ?? [];
						}
					}

				// ─── CUSTOM FIELD ─────────────────────────────────────────────────────
				} else if (resource === 'customField') {
					if (operation === 'create') {
						const label = this.getNodeParameter('label', i) as string;
						const forEntity = this.getNodeParameter('for', i) as string;
						const type = this.getNodeParameter('type', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const { opts: optsString, ...restAdditional } = additionalFields;
						const opts = optsString ? (optsString as string).split(',').map((o) => o.trim()).filter(Boolean) : undefined;

						const cfBody = cleanData({
							label,
							for: forEntity,
							type,
							...restAdditional,
							...(opts && opts.length > 0 ? { opts } : {}),
						});
						responseData = await rdStationCrmApiRequest.call(this, 'POST', '/custom_fields', { custom_field: cfBody });
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
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						const { opts: optsString, ...restAdditional } = additionalFields;
						const opts = optsString ? (optsString as string).split(',').map((o) => o.trim()).filter(Boolean) : undefined;

						const cfBody = cleanData({
							...restAdditional,
							...(opts && opts.length > 0 ? { opts } : {}),
						});
						if (Object.keys(cfBody).length === 0) {
							throw new NodeOperationError(this.getNode(), 'Pelo menos um campo deve ser fornecido para atualizar o campo personalizado.', { itemIndex: i });
						}
						responseData = await rdStationCrmApiRequest.call(this, 'PUT', `/custom_fields/${id}`, { custom_field: cfBody });
						responseData = responseData.custom_field ?? responseData;
					}

				// ─── DEAL PIPELINE ────────────────────────────────────────────────────
				} else if (resource === 'dealPipeline') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						responseData = await rdStationCrmApiRequest.call(this, 'POST', '/deal_pipelines', { deal_pipeline: { name } });
						responseData = responseData.deal_pipeline ?? responseData;

					} else if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;
						const response = await rdStationCrmApiRequest.call(this, 'GET', `/deal_pipelines/${id}`);
						responseData = response.deal_pipeline ?? response;

					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const response = await rdStationCrmApiRequest.call(this, 'GET', '/deal_pipelines', {}, {});
						const allPipelines = Array.isArray(response) ? response : (response.deal_pipelines ?? []);
						if (returnAll) {
							responseData = allPipelines;
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = allPipelines.slice(0, limit);
						}

					} else if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						const body = cleanData({ ...additionalFields });
						if (Object.keys(body).length === 0) {
							throw new NodeOperationError(this.getNode(), 'Pelo menos um campo deve ser fornecido para atualizar o funil.', { itemIndex: i });
						}
						responseData = await rdStationCrmApiRequest.call(this, 'PUT', `/deal_pipelines/${id}`, { deal_pipeline: body });
						responseData = responseData.deal_pipeline ?? responseData;
					}

				// ─── DEAL STAGE ───────────────────────────────────────────────────────
				} else if (resource === 'dealStage') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const deal_pipeline_id = this.getNodeParameter('deal_pipeline_id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
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
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						const body = cleanData({ ...additionalFields });
						if (Object.keys(body).length === 0) {
							throw new NodeOperationError(this.getNode(), 'Pelo menos um campo deve ser fornecido para atualizar a etapa.', { itemIndex: i });
						}
						responseData = await rdStationCrmApiRequest.call(this, 'PUT', `/deal_stages/${id}`, body);
						responseData = responseData.deal_stage ?? responseData;
					}

				// ─── CAMPAIGN ─────────────────────────────────────────────────────────
				} else if (resource === 'campaign') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						const body = cleanData({ name, ...additionalFields });
						responseData = await rdStationCrmApiRequest.call(this, 'POST', '/campaigns', { campaign: body });
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
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						const body = cleanData({ ...additionalFields });
						if (Object.keys(body).length === 0) {
							throw new NodeOperationError(this.getNode(), 'Pelo menos um campo deve ser fornecido para atualizar a campanha.', { itemIndex: i });
						}
						responseData = await rdStationCrmApiRequest.call(this, 'PUT', `/campaigns/${id}`, { campaign: body });
						responseData = responseData.campaign ?? responseData;
					}

				// ─── SOURCE ───────────────────────────────────────────────────────────
				} else if (resource === 'source') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						const body = cleanData({ name, ...additionalFields });
						responseData = await rdStationCrmApiRequest.call(this, 'POST', '/deal_sources', { deal_source: body });
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
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						const body = cleanData({ ...additionalFields });
						if (Object.keys(body).length === 0) {
							throw new NodeOperationError(this.getNode(), 'Pelo menos um campo deve ser fornecido para atualizar a fonte.', { itemIndex: i });
						}
						responseData = await rdStationCrmApiRequest.call(this, 'PUT', `/deal_sources/${id}`, { deal_source: body });
						responseData = responseData.deal_source ?? responseData;
					}

				// ─── LOST REASON ──────────────────────────────────────────────────────
				} else if (resource === 'lostReason') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						responseData = await rdStationCrmApiRequest.call(this, 'POST', '/deal_lost_reasons', { name });
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

				// ─── USER ─────────────────────────────────────────────────────────────
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

				// ─── TEAM ─────────────────────────────────────────────────────────────
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
