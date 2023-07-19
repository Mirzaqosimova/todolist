// import {
//   FastifyAdapter,
//   NestFastifyApplication,
// } from '@nestjs/platform-fastify';
// import { Test } from '@nestjs/testing';
// import { AppModule } from '../../src/app.module';
// import { HttpStatus, ValidationPipe, VersioningType } from '@nestjs/common';
// import { WsAdapter } from '@nestjs/platform-ws';

// let app: NestFastifyApplication;

// export async function createTestingModule() {
//   const moduleBuilder = Test.createTestingModule({
//     imports: [AppModule],
//   });

//   const module = await moduleBuilder.compile();

//   app = module
//     .createNestApplication<NestFastifyApplication>(new FastifyAdapter())
//     .enableVersioning({
//       type: VersioningType.URI,
//       defaultVersion: '1',
//     })
//     .useWebSocketAdapter(new WsAdapter(app))
//     .useGlobalPipes(
//       new ValidationPipe({
//         whitelist: true,
//         errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
//       }),
//     );
//   await app.init();
//   await app.getHttpAdapter().getInstance().ready();
//   return app;
// }

// export async function closeTestingModule() {
//   if (app) await app.close();
// }

// export function getTestingModule() {
//   if (!app) throw 'No app was initialized!!!';

//   return app;
// }
