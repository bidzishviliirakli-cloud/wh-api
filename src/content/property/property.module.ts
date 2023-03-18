import { Module } from "@nestjs/common";

import { StrapiModule } from "@strapi";

import { PropertyController } from "./property.controller";
import { PropertyService } from "./property.service";

@Module({
	imports: [StrapiModule],
	controllers: [PropertyController],
	providers: [PropertyService]
})
export class PropertyModule {}
