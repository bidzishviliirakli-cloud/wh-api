import { ECMSContent, IAgent } from "@contracts";
import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { AgentService } from "./agent.service";

@ApiTags(ECMSContent.AGENT)
@Controller(`content/${ECMSContent.AGENT}`)
export class AgentController {
	constructor(private agentService: AgentService) {}

	@Get(":id")
	getById(@Param("id") id: string): Promise<IAgent> {
		return this.agentService.getOne(id);
	}

	@Get()
	getMany(@Query("locale") locale: string): Promise<Array<IAgent>> {
		return this.agentService.getMany(locale);
	}
}
