import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userData : any = null;
  userName : any = null;
  posts : any = null;
  isMainUser : boolean = localStorage.getItem('id') === this.router.url.split('/')[2]
  imgChangeDialog : boolean = false
  loading : boolean = true
  showDialog = () => this.imgChangeDialog = true
  hideDialog = () => this.imgChangeDialog = false

  constructor(private http : HttpService , private router : Router) {
    
  }

  ngOnInit(): void {
    this.http.getRequest(`${environment.apiUrl}/users/${this.router.url.split('/')[2]}`)
    .subscribe(response  => {
      this.userData = response.data;
      console.log(this.userData)
      this.userName = `${this.userData.first_name} ${this.userData.last_name}`
      setTimeout(()=> {
        this.http.getRequest(`${environment.apiUrl}/post`)
        .subscribe(response => {
          this.posts = response.data
        })
        this.loading = false;
      } , 0)
    })
  }


  reload = () => {
    this.imgChangeDialog = false
    this.http.getRequest(`${environment.apiUrl}/users/${this.router.url.split('/')[2]}`)
    .subscribe(response  => {
      this.userData = response.data;
      console.log(this.userData)
      this.userName = `${this.userData.first_name} ${this.userData.last_name}`
      setTimeout(()=> {
        this.http.getRequest(`${environment.apiUrl}/post`)
        .subscribe(response => {
          this.posts = response.data
        })
        this.loading = false;
      } , 0)
    })
  }
  

}
