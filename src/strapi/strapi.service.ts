import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

import { EHttpCode, STRAPI_URL, IGetContentParams } from "@contracts";

@Injectable()
export class StrapiService {
	constructor(private httpService: HttpService) {}

	async getContent(params: IGetContentParams) {
		const { id, content } = params;
		const url = this.generateUrl(id, content);

		let strapiResponse;

		try {
			strapiResponse = await firstValueFrom(this.httpService.get(url));
		} catch (error) {
			let status = error.response.status || HttpStatus.INTERNAL_SERVER_ERROR;
			let message = error.response.statusText || EHttpCode.INTERNAL_SERVER_ERROR;

			throw new HttpException(message, status);
		}

		return strapiResponse.data.data;
	}

	private generateUrl(id: string, content: string) {
		let baseUrl = `${STRAPI_URL}/${content}`;

		if (id) {
			return `${baseUrl}/${id}?populate=*`;
		}

		return `${baseUrl}?populate=*`;
	}
}
