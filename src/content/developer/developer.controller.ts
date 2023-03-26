import { ECMSContent, IDeveloper } from "@contracts";
import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DeveloperService } from "./developer.service";

@ApiTags(ECMSContent.DEVELOPER)
@Controller(`content/${ECMSContent.DEVELOPER}`)
export class DeveloperController {
    constructor(private developerService: DeveloperService) { }

    @Get(":id")
    getById(@Param("id") id: string): Promise<IDeveloper> {
        return this.developerService.getOne(id);
    }

    @Get()
    getMany(): Promise<Array<IDeveloper>> {
        return this.developerService.getMany();
    }
}
