import { Module } from "@nestjs/common";

import { StrapiModule } from "@strapi";

import { BlogController } from "./blog.controller";
import { BlogService } from "./blog.service";

@Module({
	imports: [StrapiModule],
	controllers: [BlogController],
	providers: [BlogService]
})
export class BlogModule {}
