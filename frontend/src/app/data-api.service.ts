import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { HelperMethods } from './util/helper';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  private main_url!:string
  private url!:string
  constructor(public http:HttpClient) 
  {
    this.main_url=HelperMethods.link
  }
  getAll() {
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token.getToken()}`);
    return this.http.get<any>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  patch(item:any)
  {
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token.getToken()}`);
    return this.http.patch<any>(this.url,item).pipe(catchError(this.handleError))
  }
  
  post(item:any)
  {
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token.getToken()}`);
      return this.http.post<any>(this.url,item).pipe(catchError(this.handleError))
    }
    update(item:any)
    {
      // const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token.getToken()}`);
    return this.http.put<any>(this.url,item).pipe(catchError(this.handleError))
  }
  private handleError(error:HttpErrorResponse)
  {
    return throwError(() => new Error(error.error.Error));
    //use the method below to remove error logs
    // const errorMsg = error.error.Error || 'An unknown error occurred';
  
    // // Log the error as a warning (optional)
    // console.warn('API Error (muted):', errorMsg);
  
    // // Return the error as a controlled object instead of throwing
    // return of({ error: true, message: errorMsg });
  }
  getUrl()
  {
    return this.main_url
  }
  addUrl(url:string)
  {
    this.url=this.main_url+url
  }
}
