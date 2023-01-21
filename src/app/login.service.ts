import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { LoginDto } from 'src/dtos/LoginDto';
import { LoginResponseDto } from 'src/dtos/LoginResponseDto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private endpoint : string = "https://userservice20230121111411.azurewebsites.net/api";

  constructor(private http: HttpClient) { }

  login(username : string, password: string) : Observable<LoginResponseDto> {
    let login = new LoginDto(username, password);
    return this.http.post<LoginResponseDto>(this.endpoint + "/login", login)
    .pipe(
      catchError(this.handleError<LoginResponseDto>('login', undefined))
    );
  }

  register(username: string, password: string) {
    let login = new LoginDto(username, password);
    return this.http.post<Object>(this.endpoint + "/registration", login)
    .pipe(
      catchError(this.handleError<Object>('registration'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
  
}
