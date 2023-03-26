import { ECMSContent } from '@contracts';
import { Injectable } from '@nestjs/common';
import { StrapiService } from '@strapi';
import { IFaq } from '@contracts';

@Injectable()
export class FaqService {
    content = ECMSContent.FAQ;

    constructor(private strapiService: StrapiService) { }

    async getOne(id: string): Promise<IFaq> {
        return this.strapiService.getContent({ id, content: this.content });
    }

    async getMany(): Promise<Array<IFaq>> {
        return this.strapiService.getContent({ content: this.content });
    }
}
