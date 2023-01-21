import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { MatchingsDto } from 'src/dtos/MatchingsDto';

@Injectable({
  providedIn: 'root'
})
export class MatchingService {

  constructor(private http: HttpClient) { }

  private endpoint : string = "https://clc-matchingservice.azurewebsites.net/api/matchings";

  getMatchingsForDestination(destinationId : string) : Observable<MatchingsDto> {
    return this.http.get<MatchingsDto>(this.endpoint + "/destination/" + destinationId)
    .pipe(
      catchError(this.handleError<MatchingsDto>('getMatchingsForDestination', undefined))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
