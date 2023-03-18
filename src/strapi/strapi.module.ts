import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { StrapiService } from "./strapi.service";

@Module({
	imports: [HttpModule],
	providers: [StrapiService],
	exports: [HttpModule, StrapiService]
})
export class StrapiModule {}
