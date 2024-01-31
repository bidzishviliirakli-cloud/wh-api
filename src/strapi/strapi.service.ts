import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

import { EHttpCode, STRAPI_URL, IGetContentParams, ICreateContentParams } from "@contracts";
import { Util } from "@util";

@Injectable()
export class StrapiService {
	constructor(private httpService: HttpService) {}

	async getContent(params: IGetContentParams) {
		const { id, content, filter, locale } = params;
		const url = this.generateUrl(filter, content, locale, id);

		let strapiResponse;

		try {
			strapiResponse = await firstValueFrom(this.httpService.get(url));
		} catch (error) {
			let status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
			let message = error.response?.statusText || EHttpCode.INTERNAL_SERVER_ERROR;

			throw new HttpException(message, status);
		}

		return strapiResponse.data.data;
	}

	async createContent(params: ICreateContentParams<any>) {
		const { data, content } = params;
		const url = `${STRAPI_URL}/${content}`;

		let strapiResponse;

		try {
			strapiResponse = await firstValueFrom(this.httpService.post(url, { data }));
		} catch (error) {
			let status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
			let message = error.response?.statusText || EHttpCode.INTERNAL_SERVER_ERROR;

			throw new HttpException(message, status);
		}

		return strapiResponse.data.data;
	}

	async getGeoLocation(address: string): Promise<{lat: number, lng: number}>{
		const res = await firstValueFrom(this.httpService.get("https://maps.googleapis.com/maps/api/geocode/json", {
			params: {
				address: address,
				//@TODO MOVE IT TO .env
				key: "AIzaSyAqwi7RWqdUZWakzP8PvCkvGkbvbLvbcQ0"
			}
		}
		))

		return res?.data?.results[0]?.geometry?.location;
	}

	private generateUrl(filter = "", content: string, locale: string, id?: string): string {
		let baseUrl = `${STRAPI_URL}/${content}`;

		if (Util.isNull(locale)) locale = "en";

		if (id) {
			return `${baseUrl}/${id}?populate=*`;
		}

		return `${baseUrl}?populate=*&locale=${locale}&${filter}`;
	}
}
