import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http : HttpClient) { }

  getRequest(url : string) : Observable<any> {
    return this.http.get(url)
  }

  postRequest(url: string , data : Object , headers : Object): Observable<any> {
    return this.http.post(url , data , headers)
  }

  putRequest(url : string , data : Object , headers : Object): Observable<any> {
    return this.http.put(url , data , headers)
  }

  deleteRequest(url : string) : Observable<any> {
    return this.http.delete(url)
  }
}
