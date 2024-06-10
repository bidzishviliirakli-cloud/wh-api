import "dotenv/config";

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { TransformInterceptor } from "./interceptors/TransformInterceptor";
import { SWAGGER_PROPERTIES } from "@contracts";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const PORT = process.env.PORT || 5555;

	const config = new DocumentBuilder()
		.setTitle(SWAGGER_PROPERTIES.title)
		.setDescription(SWAGGER_PROPERTIES.description)
		.setVersion(SWAGGER_PROPERTIES.version)
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup(SWAGGER_PROPERTIES.path, app, document);

	app.useGlobalInterceptors(new TransformInterceptor());
	app.useGlobalPipes(new ValidationPipe());
	app.enableCors();

	await app.listen(PORT);
}
bootstrap();
