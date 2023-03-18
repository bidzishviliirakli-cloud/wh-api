import { IBlog } from "@contracts";
import { Controller, Get, Param } from "@nestjs/common";

import { BlogService } from "./blog.service";

@Controller("blog")
export class BlogController {
	constructor(private blogService: BlogService) {}

	@Get(":id")
	getById(@Param("id") id: string): Promise<IBlog> {
		return this.blogService.getOne(id);
	}

	@Get()
	getMany(): Promise<Array<IBlog>> {
		return this.blogService.getMany();
	}
}
