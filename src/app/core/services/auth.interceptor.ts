import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { timeInterval, windowTime, finalize } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    apiUrl: string;
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        this.apiUrl = environment.API.URL + req.urlWithParams;
        const token = localStorage.getItem('access_token');
        if (req.url.includes('/creation') || (req.url.includes('/profile_picture'))) {
            headers = headers.delete('Content-Type', 'application/json').append('Authorization', `Bearer ${token}` );

        }
        // tslint:disable-next-line:object-literal-shorthand
        const anonymousReq = req.clone({ url: this.apiUrl, headers: headers });
        return next.handle(anonymousReq);
    }
}
