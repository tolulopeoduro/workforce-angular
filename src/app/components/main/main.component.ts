import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setData } from 'src/app/reducers/userActions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private router : Router , private http : HttpClient , private store : Store<{user : any}>) { }

  ngOnInit(): void {
    if (localStorage.getItem('id')) {
      this.http.get(`${environment.apiUrl}/users/${localStorage.getItem('id')}`)
      .subscribe(res => this.store.dispatch(setData(res)))
    }
  }

}
