import {
	IDataObject,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	IHttpRequestMethods,
	JsonObject,
	NodeApiError,
} from 'n8n-workflow';

const BASE_URL = 'https://crm.rdstation.com/api/v1';

export async function rdStationCrmApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any> {
	const options: {
		method: IHttpRequestMethods;
		url: string;
		qs: IDataObject;
		body?: IDataObject;
		json: boolean;
	} = {
		method,
		url: `${BASE_URL}${endpoint}`,
		qs,
		json: true,
	};

	if (Object.keys(body).length > 0) {
		options.body = body;
	}

	try {
		return await this.helpers.httpRequestWithAuthentication.call(this, 'rdStationCrmApi', options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

export async function rdStationCrmApiRequestAllItems(
	this: IExecuteFunctions,
	propertyName: string,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any[]> {
	const returnData: any[] = [];
	const limit = 200;
	const maxPages = 50;
	let page = 1;

	do {
		const responseQs: IDataObject = {
			...qs,
			page,
			limit,
		};

		const response = await rdStationCrmApiRequest.call(this, method, endpoint, body, responseQs);

		const items = response[propertyName];
		if (!items || !Array.isArray(items)) {
			break;
		}

		returnData.push(...items);

		if (!response.has_more || page >= maxPages) {
			break;
		}

		page++;
	} while (true);

	return returnData;
}

export function cleanData(data: IDataObject): IDataObject {
	const cleaned: IDataObject = {};

	for (const key of Object.keys(data)) {
		const value = data[key];

		if (value === null || value === undefined || value === '') {
			continue;
		}

		if (Array.isArray(value)) {
			if (value.length === 0) {
				continue;
			}
			cleaned[key] = value;
			continue;
		}

		if (typeof value === 'object') {
			const nestedCleaned = cleanData(value as IDataObject);
			if (Object.keys(nestedCleaned).length === 0) {
				continue;
			}
			cleaned[key] = nestedCleaned;
			continue;
		}

		cleaned[key] = value;
	}

	return cleaned;
}
