import { Component, OnInit } from '@angular/core';
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
  
  constructor(private http : HttpService) {
    
  }

  ngOnInit(): void {
    this.http.getRequest(`${environment.apiUrl}/users/${localStorage.getItem('id')}`)
    .subscribe(response  => {
      this.userData = response.data;
      console.log(this.userData)
      this.userName = `${this.userData.first_name} ${this.userData.last_name}`
    })
    this.http.getRequest(`${environment.apiUrl}/post`)
    .subscribe(response => {
      this.posts = response.data
    })
  }

}
