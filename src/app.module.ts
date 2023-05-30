import { Module } from "@nestjs/common";
import { ContentModule } from "@content";
import { StrapiModule } from "@strapi";
import { join } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";

// @Module({
// 	imports: [ServeStaticModule.forRoot({
// 		rootPath: join(__dirname, '..', 'client'),
// 		//FIXME fix path for server and Client serving
// 	}),
// 		ContentModule, StrapiModule]
// })
@Module({
	imports: [ContentModule, StrapiModule]
})
export class AppModule {}
