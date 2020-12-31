import { timeout } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { InjectionToken, Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';

// From : https://stackoverflow.com/a/45986060/359765

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');
export const defaultTimeout = 10000;

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  constructor(@Inject(DEFAULT_TIMEOUT) protected defaultTimeout) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timeoutDuration = Number(req.headers.get('timeout')) || this.defaultTimeout;
    return next.handle(req).pipe(timeout(timeoutDuration));
  }
}
