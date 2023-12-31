import { ECMSContent, IProperty } from "@contracts";
import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { ProjectService } from "./project.service";

@ApiTags(ECMSContent.PROJECT)
@Controller(`content/${ECMSContent.PROJECT}`)
export class ProjectController {
	constructor(private projectService: ProjectService) {}
	
	@Get(":id")
	getById(@Param("id") id: string): Promise<any> {
		return this.projectService.getOne(id);
	}

	@Get()
	getMany(): Promise<Array<IProperty>> {
		return this.projectService.getMany();
	}


}
