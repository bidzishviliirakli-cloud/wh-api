import { ECMSContent, IBlog } from "@contracts";
import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { BlogService } from "./blog.service";

@ApiTags(ECMSContent.BLOG)
@Controller(`content/${ECMSContent.BLOG}`)
export class BlogController {
	constructor(private blogService: BlogService) {}

	@Get(":id")
	getById(@Param("id") id: string): Promise<IBlog> {
		return this.blogService.getOne(id);
	}

	@Get()
	getMany(@Query("locale") locale: string): Promise<Array<IBlog>> {
		return this.blogService.getMany(locale);
	}
}
