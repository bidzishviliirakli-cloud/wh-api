import { Module } from "@nestjs/common";
import { ContentModule } from "@content";
import { StrapiModule } from "@strapi";

@Module({
	imports: [ContentModule, StrapiModule]
})
export class AppModule {}
