import { CallHandler, Injectable, NestInterceptor, ExecutionContext, InternalServerErrorException }
from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { catchError, Observable, throwError ,tap} from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
 intercept(context: ExecutionContext, next: CallHandler): Observable<any>
{
 console.log('New request!');
const now = Date.now();
// Обработка входящего запроса
// tap() – метод обработки запросов, выполненных успешно
// catchError() – метод обработки вызванных исключений
return next
  .handle()
  .pipe(
   tap(() => {
  console.log(`\nExecution time: ${Date.now() - now}ms`);
  console.log('\nRequest was successful!')
}),
         catchError(err => {
         console.log(`\nExecution time: ${Date.now() - now}ms`);
         console.log('\nRequest was failed!')
         console.log('\nError message: ', err);
        return throwError(new InternalServerErrorException());
       })
); }}