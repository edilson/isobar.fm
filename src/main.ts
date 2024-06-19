import {
  Context,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { ContextIdFactory, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BandsService } from './bands/bands.service';
import { INestApplicationContext } from '@nestjs/common';

let app: INestApplicationContext;

async function bootstrap(): Promise<INestApplicationContext> {
  if (!app) {
    app = await NestFactory.createApplicationContext(AppModule);
  }

  return app;
}

export async function getBandsHandler(
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> {

  const instance = await bootstrap();
  
  const contextId = ContextIdFactory.create();
  instance.registerRequestByContextId({ context }, contextId);

  const service = await instance.resolve<BandsService>(BandsService, contextId);

  let result;

  if(event.queryStringParameters.name) {
    result = await service.getBandsByName(event.queryStringParameters.name);
  } else if(event.queryStringParameters.sortBy) {
    result = await service.getBands(event.queryStringParameters.sortBy)
  } else {
    result = await service.getBands();
  }

  return { statusCode: 200, body: JSON.stringify(result.data) };
}

export async function getBandByIdHandler(
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> {

  const instance = await bootstrap();
  
  const contextId = ContextIdFactory.create();
  instance.registerRequestByContextId({ context }, contextId);

  const service = await instance.resolve<BandsService>(BandsService, contextId);

  const result = await service.getBandById(event.body);

  return { statusCode: 200, body: JSON.stringify(result.data) };
}
