import { Module } from '@nestjs/common';
import { StrapiModule } from '@strapi';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';

@Module({
  imports: [StrapiModule],
  controllers: [FaqController],
  providers: [FaqService]
})
export class FaqModule { }
