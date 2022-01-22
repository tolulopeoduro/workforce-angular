import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setData } from 'src/app/reducers/userActions';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  loading : boolean = false;
  error : any = null; 
  data = {
    full_name : "",
    email : "",
    password : ""
  }

  constructor(private http : HttpService , private router : Router , private store : Store<{user : any}>) { }

  submit() {
    this.loading = true
    this.error = false
    this.http.postRequest(`${environment.apiUrl}/auth/signup` , this.data , {})
    .subscribe((response) => {
      localStorage.setItem("id" , response.userId)
      localStorage.setItem("token" , response.token)
      this.http.getRequest(`${environment.apiUrl}/users/${localStorage.getItem('id')}`)
      .subscribe(res => this.store.dispatch(setData(res)))
      this.loading = false
      this.router.navigate(["/"])
    }, (error) => {
      this.error = error.error.message
      this.loading = false
    })
  }


  ngOnInit(): void {
  }

}
