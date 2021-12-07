import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setData } from 'src/app/reducers/userActions';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http : HttpService , private router : Router , private store : Store<{user : any}>) { }

  email : string = ""
  password : string = ""
  loading : boolean = false
  error : any = null


  login = () => {
    this.loading = true
    this.error = null
    this.http.postRequest( `${environment.apiUrl}/auth/login` , {email : this.email , password : this.password} , {})
    .subscribe((response) => {
      localStorage.setItem("id" , response.userId)
      localStorage.setItem("token" , response.token)
      
      this.http.getRequest(`${environment.apiUrl}/users/${localStorage.getItem('id')}`)
      .subscribe(res => this.store.dispatch(setData(res)))
      
      this.loading = false
      this.router.navigate(["/"])
      this.router.navigate
    }, (error) => {
      this.error = error.error.message
      this.loading = false
      console.log(error)
    })
  }

  ngOnInit(): void {
  }

}
