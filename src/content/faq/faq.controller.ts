import { Controller, Get, Param } from "@nestjs/common";
import { ECMSContent, IFaq } from "@contracts";
import { FaqService } from "./faq.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags(ECMSContent.FAQ)
@Controller(`content/${ECMSContent.FAQ}`)
export class FaqController {
	constructor(private faqService: FaqService) {}

	@Get(":id")
	getById(@Param("id") id: string): Promise<IFaq> {
		return this.faqService.getOne(id);
	}

	@Get()
	getMany(): Promise<Array<IFaq>> {
		return this.faqService.getMany();
	}
}
