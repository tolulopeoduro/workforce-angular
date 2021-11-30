import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpService } from '../services/http/http.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {

  images :any = null
  userData : any = null

  constructor(private http : HttpService , private router : Router) { }

  ngOnInit(): void {
    this.http.getRequest(`${environment.apiUrl}/users/${this.router.url.split('/')[2]}`)
    .subscribe(response  => {
      this.userData = response.data;
      console.log(this.userData)
    })
  }


  selectImage(event : any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      console.log(this.images)
    }
  }

  submit = () => {
    const formData = new FormData();
    formData.append('file' , this.images);
    this.http.postRequest(`${environment.apiUrl}/file` , formData , {})
    .subscribe(res => console.log(res))
  }

}
