import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class SetupSwagger {
  private readonly swaggerPath = 'api';

  constructor(private app: INestApplication) {}

  init() : any {
    const config = new DocumentBuilder()
      .setTitle('Gaming Platform')
      .setDescription('Implementation Challenge of Gaming Platform')
      .setVersion('1.0')
      .addBasicAuth()
      .build();
    const document = SwaggerModule.createDocument(this.app, config);

    SwaggerModule.setup(this.swaggerPath, this.app, document);
  }
}
