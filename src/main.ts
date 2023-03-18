// import { ValidationPipe } from '@nestjs/common';
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { TransformInterceptor } from "./interceptors/TransformInterceptor";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// const config = new DocumentBuilder()
	// 	.setTitle(SWAGGER_PROPERTIES.title)
	// 	.setDescription(SWAGGER_PROPERTIES.description)
	// 	.setVersion(SWAGGER_PROPERTIES.version)
	// 	.addTag(SWAGGER_PROPERTIES.tag)
	// 	.build();
	// const document = SwaggerModule.createDocument(app, config);
	// SwaggerModule.setup(SWAGGER_PROPERTIES.path, app, document);

	app.useGlobalInterceptors(new TransformInterceptor());
	app.useGlobalPipes(new ValidationPipe());

	await app.listen(3000);
}
bootstrap();
