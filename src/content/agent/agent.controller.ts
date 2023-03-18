import { IAgent } from "@contracts";
import { Controller, Get, Param, Query } from "@nestjs/common";

import { AgentService } from "./agent.service";

@Controller("agent")
export class AgentController {
	constructor(private agentService: AgentService) {}

	@Get(":id")
	getById(@Param("id") id: string): Promise<IAgent> {
		return this.agentService.getOne(id);
	}

	@Get()
	getMany(): Promise<Array<IAgent>> {
		return this.agentService.getMany();
	}
}
