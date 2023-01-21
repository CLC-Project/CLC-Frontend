import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { DestinationDto } from 'src/dtos/DestinationDto';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor(private http: HttpClient) { }

  private endpoint : string = "https://destinationservice.azurewebsites.net/api/destinations";

  getDestinationsForUser(userId : string) : Observable<DestinationDto[]> {
    return this.http.get<DestinationDto[]>(this.endpoint + "/user/" + userId)
    .pipe(
      catchError(this.handleError<DestinationDto[]>('getDestinationsForUser',[]))
    );
  }

  postDestination(country: string, region: string, city: string, userId: string)  {
    let destination = new DestinationDto("",country, region, city, userId);
    return this.http.post(this.endpoint, destination)
    .pipe(
      catchError(this.handleError<DestinationDto[]>('postDestination'))
    );
  }

  deleteDestination(id: string)  {
    return this.http.delete(this.endpoint + "/" + id)
    .pipe(
      catchError(this.handleError<DestinationDto[]>('deleteDestination'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
  
}
