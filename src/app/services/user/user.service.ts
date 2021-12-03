import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setData } from 'src/app/reducers/userActions';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient , private store : Store<{user : any}> ) { }

  getUser(): Observable<any> {
    this.http.get(`${environment.apiUrl}/users/${localStorage.getItem('id')}`)
    .subscribe((response : any)  => {
      this.store.dispatch(setData(response.data))
    })
  }
  }

}
