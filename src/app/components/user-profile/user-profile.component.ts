import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  userImg : any = null;
  isMainUser : boolean = localStorage.getItem('id') === this.router.url.split('/')[2] || this.router.url.split('/')[1] === 'my-profile'
  imgChangeDialog : boolean = false
  loading : boolean = true
  showDialog = () => this.imgChangeDialog = true
  hideDialog = () => this.imgChangeDialog = false
  userId : any = null
  
  constructor(private http : HttpService , private router : Router , private activatedRoute : ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
          //this.userData = this.router.url.split('/')[1] === 'my-profile' ? localStorage.getItem('id') : activatedRoute.snapshot.url[1].path
          this.userId = this.router.url.split('/')[1] === 'my-profile' ? localStorage.getItem('id') : this.router.url.split('/')[2]  // localStorage.getItem('id') || this.router.url.split('/')[2]
          this.getData()
        });
  }
  
  ngOnInit(): void {
    this.getData()
  }


  getData = () => {
    this.loading = true
    if (this.router.url.split('/')[1] === 'my-profile' && !localStorage.getItem('id')) {
      this.router.navigate(['/login'])
    }
    this.http.getRequest(`${environment.apiUrl}/users/${this.userId}`)
    .subscribe(response  => {
      this.userData = response.data;
      this.userName = `${response.data.first_name} ${response.data.last_name}`
      this.userImg = response.data.imgUrl
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
