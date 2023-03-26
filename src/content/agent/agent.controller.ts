import { ECMSContent, IAgent } from "@contracts";
import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { AgentService } from "./agent.service";

@ApiTags(ECMSContent.AGENT)
@Controller(`content/${ECMSContent.AGENT}`)
export class AgentController {
	constructor(private agentService: AgentService) { }

	@Get(":id")
	getById(@Param("id") id: string): Promise<IAgent> {
		return this.agentService.getOne(id);
	}

	@Get()
	getMany(): Promise<Array<IAgent>> {
		return this.agentService.getMany();
	}
}
