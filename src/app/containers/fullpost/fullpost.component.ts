import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';
import blocksToHtml from 'editorjs-render'
import { trigger , state , style , animate , transition } from '@angular/animations';


@Component({
  selector: 'app-fullpost',
  templateUrl: './fullpost.component.html',
  styleUrls: ['./fullpost.component.scss'],
  animations : [
    trigger('FullComment' , [
      state('show' , style({
        height : '100px'
      })),
      state('hide' , style({
        height : '40px'
      })),
      transition('show => hide' , animate('300ms')),
      transition('hide => show' , animate('300ms'))
    ]),
    trigger('showCancel' , [
      state('show' , style({
        height : '40px',
        display : 'auto',
        opacity : '1'
      })),
      state('hide' , style({
        height : '0px',
        border : 'none',
        display : 'none',
        opacity : '1'
      })),
      transition('show => hide' , animate('300ms')),
      transition('hide => show' , animate('300ms'))
    ])
  ]
})
export class FullpostComponent implements OnInit {

  constructor(private router : Router , private http : HttpService , private titleService : Title) { }

  showFullComment : boolean = false
  get commentState () {
    return this.showFullComment ? 'show' : 'hide'
  }
  

  postData : any = null;
  author : any = null;
  deleteButtonActive : boolean = false;
  showActions : any = null;
  postHTML : any
  comment : string = "";
  liked : boolean = false;
  totalLikes : number = 0;
  
  ngOnInit(): void {
    this.http.getRequest(`${environment.apiUrl}/post/${this.router.url.split("/")[2]}`)
    .subscribe(res => {
      this.postData = res.data[0]
      this.postHTML = blocksToHtml(this.postData.content.blocks)
      this.titleService.setTitle(this.postData.title)
      this.liked = this.postData.likes.includes(localStorage.getItem('id'))
      this.totalLikes = this.postData.likes.length
      
    })
  }

  deletePost = () => {
    this.http.deleteRequest(`${environment.apiUrl}/post/${this.postData._id}`)
    .subscribe(res => {
      this.deleteButtonActive = false;
      this.router.navigate(["/"])
    })
  }

  ToggleDeleteDialog = (a : boolean) => {
    this.deleteButtonActive = a;
  }

  toggleComments = () => {
    this.showFullComment = !this.showFullComment
  }

  like = () => {
    const data = {userId : localStorage.getItem('id')}
    if (this.liked) {
      this.http.postRequest(`${environment.apiUrl}/post/unlike/${this.router.url.split('/')[2]}` , data , {headers : {Authorization : localStorage.getItem('token')}})
        .subscribe((res) => {
          this.liked = false
          this.totalLikes -= 1
      })
    } else {
      this.http.postRequest(`${environment.apiUrl}/post/like/${this.router.url.split('/')[2]}` , data , {headers : {Authorization : localStorage.getItem('token')}})
        .subscribe((res) => {
          this.liked = true;
          this.totalLikes += 1
      })
    }
  }
  
  submitComment = () => {
    if (this.comment === "") return;
    const data = {
      userId : localStorage.getItem('id'),
      content : this.comment,
      date : new Date().toDateString()
    }
    this.http.postRequest(`${environment.apiUrl}/post/comment/${this.router.url.split('/')[2]}` , data , {headers : {Authorization : localStorage.getItem('token')}})
      .subscribe((res) => {
        this.comment = ""
        this.showFullComment = false
        this.postData.comments.unshift(data)
      })
  }

}
