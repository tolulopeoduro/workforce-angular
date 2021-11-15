import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private httpservice : HttpService , private router : Router) { }

  email : string = ""
  password : string = ""
  loading : boolean = false
  error : any = null


  login = () => {
    this.loading = true
    this.error = null
    this.httpservice.postRequest( `${environment.apiUrl}/auth/login` , {email : this.email , password : this.password} , {})
    .subscribe((response) => {
      localStorage.setItem("id" , response.userId)
      localStorage.setItem("token" , response.userId)
      this.loading = false
      this.router.navigate(["/"])
    }, (error) => {
      this.error = error.error.message
      this.loading = false
      console.log(error)
    })
  }

  ngOnInit(): void {
  }

}
