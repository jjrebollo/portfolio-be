import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ZodExceptionFilter } from './validation/zod-exception.filter';

export const API_PREFIX = 'api/v1';

export function configureApp(app: INestApplication): void {
  app.enableCors();
  app.setGlobalPrefix(API_PREFIX);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new ZodExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Portfolio Backend API')
    .setDescription(
      'Content API for the portfolio web, iOS, and Android clients.',
    )
    .setVersion('1.0.0')
    .addTag('health')
    .addTag('portfolio')
    .addTag('admin-portfolio')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'api-key')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
}
