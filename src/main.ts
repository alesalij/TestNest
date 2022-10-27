import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { HttpExceptionFilter } from './common/filters/httpException.filter';
import { LoggingInterceptor } from './common/interceptors/logger.interceptor';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
  });
  // app.useGlobalInterceptors(new LoggingInterceptor());
  //app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalInterceptors(new LoggingInterceptor());
  // app.useGlobalFilters(new HttpExceptionFilter());

  console.log(`Server listen in port:${PORT}`);
  await app.listen(PORT);
}
bootstrap();
