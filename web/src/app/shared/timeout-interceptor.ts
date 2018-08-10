import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/timeout';
import { InjectionToken, Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');
export const defaultTimeout = 10000;

// From : https://stackoverflow.com/a/45986060/359765

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  constructor(@Inject(DEFAULT_TIMEOUT) protected defaultTimeout) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timeout = Number(req.headers.get('timeout')) || this.defaultTimeout;
    return next.handle(req).timeout(timeout);
  }
}
