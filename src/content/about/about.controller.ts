import { ECMSContent } from "@contracts";
import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AboutService } from "./about.service";

@ApiTags(ECMSContent.ABOUT)
@Controller(`content/${ECMSContent.ABOUT}`)
export class AboutController {
	constructor(private aboutService: AboutService) {}

	@Get()
	getOne(@Query("locale") locale: string): Promise<any> {
		return this.aboutService.getOne(locale);
	}
}
