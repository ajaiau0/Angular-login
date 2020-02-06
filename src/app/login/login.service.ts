import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private httpClient: HttpClient) { }
    // Login(user: { username: string, password: string }): Observable<any>zzz
    Login(param): Observable<any> {
        localStorage.removeItem('token');
        // const requestBody = 'username=' + user.username + '&password=' + user.password + '&grant_type=password';
        return this.httpClient.post<any>('/login/', param);
    }
}
