import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    first_name : "",
    last_name : "",
    email : "",
    password : ""
  }

  constructor(private http : HttpService , private router : Router) { }

  submit() {
    this.loading = true
    this.error = false
    this.http.postRequest(`${environment.apiUrl}/auth/signup` , this.data , {})
    .subscribe((response) => {
      localStorage.setItem("id" , response.userId)
      localStorage.setItem("token" , response.userId)
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
