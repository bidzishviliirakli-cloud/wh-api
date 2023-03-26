import { ECMSContent, IDeveloper } from "@contracts";
import { Injectable } from "@nestjs/common";
import { StrapiService } from "@strapi";

@Injectable()
export class DeveloperService {
    content = ECMSContent.DEVELOPER;

    constructor(private strapiService: StrapiService) { }

    async getOne(id: string): Promise<IDeveloper> {
        return this.strapiService.getContent({ id, content: this.content });
    }

    async getMany(): Promise<Array<IDeveloper>> {
        return this.strapiService.getContent({ content: this.content });
    }
}
