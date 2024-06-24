import { HttpException, HttpStatus } from "@nestjs/common";
import { EHttpCode } from "./contracts/enums";

const translate = require("translate-google");

export class Translate {
	async do(value: string, to: string){

		let result;

		try {
			result = await translate(value, { to });
		} catch (error) {
			console.log(error);
			throw new HttpException(EHttpCode.TRANSLATION_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return result;

	}
}