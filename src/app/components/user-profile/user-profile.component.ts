import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setData } from 'src/app/reducers/userActions';
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
  following : any = null;
  userImg : any = null;
  isMainUser : boolean = localStorage.getItem('id') === this.router.url.split('/')[2] || this.router.url.split('/')[1] === 'my-profile'
  imgChangeDialog : boolean = false
  nameChangeDialog : boolean = false
  loading : boolean = true
  showDialog = () => this.imgChangeDialog = true
  hideDialog = () => this.imgChangeDialog = false
  userId : any = null;
  totalPosts : any = null;
  isAFollower : any = null;

  showNameForm = () => this.nameChangeDialog = true
  hideNameForm = () => this.nameChangeDialog = false
  
  constructor
  (private http : HttpService , private router : Router , private activatedRoute : ActivatedRoute , private store : Store<{user : any}> , private titleService : Title) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = this.router.url.split('/')[1] === 'my-profile' ? localStorage.getItem('id') : this.router.url.split('/')[2]
      this.getData()
    });
  }
  
  ngOnInit(): void {
    this.getData()
  }

  follow = () => {
    const data = {userId : localStorage.getItem('id')}
    if (this.following === true) {
      this.http.postRequest(`${environment.apiUrl}/users/unfollow/${this.router.url.split('/')[2]}` , data , {headers : {Authorization : localStorage.getItem('token')}})
      .subscribe((res) => {
        console.log('done')
        this.following = false
      })
    } else {
      this.http.postRequest(`${environment.apiUrl}/users/follow/${this.router.url.split('/')[2]}` , data , {headers : {Authorization : localStorage.getItem('token')}})
      .subscribe((res) => {
        console.log('done2')
        this.following = true
      })
    }
  }


  getData = () => {
    
    this.loading = true
    if (this.router.url.split('/')[1] === 'my-profile' && !localStorage.getItem('id')) {
      this.router.navigate(['/login'])
    }
    this.http.getRequest(`${environment.apiUrl}/users/${this.userId}`)
    .subscribe(response  => {
      this.userData = response.data;

      if (this.router.url.split('/')[1] === 'my-profile') {
        this.store.dispatch(setData(response))
      }

      this.following = response.data.followers.includes(localStorage.getItem('id'))
      this.userImg = response.data.imgUrl
      this.titleService.setTitle(`${response.data.first_name} ${response.data.last_name} - Workforce`)
      this.isAFollower = this.store.select('user').subscribe(res => {
        this.isAFollower = res.data.followers.includes(this.router.url.split('/')[2])
      })
      
      setTimeout(()=> {
        this.http.getRequest(`${environment.apiUrl}/post/user/${this.userId}`)
        .subscribe(response => {
          this.posts = response.data
          this.totalPosts = response.data.length
          this.loading = false;
          this.imgChangeDialog = false;
        })
      } , 0)

    })
  }
  

}
