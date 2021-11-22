import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fullpost',
  templateUrl: './fullpost.component.html',
  styleUrls: ['./fullpost.component.scss']
})
export class FullpostComponent implements OnInit {

  constructor(private router : Router , private http : HttpService) { }

  postData : any = null;
  author : any = null;
  deleteButtonActive : boolean = false;
  
  ngOnInit(): void {
    this.http.getRequest(`${environment.apiUrl}/post/${this.router.url.split("/")[2]}`)
    .subscribe(res => {
      this.postData = res.data[0]
      console.log(this.postData)
      this.http.getRequest(`${environment.apiUrl}/users/${this.postData.author}`)
      .subscribe(response  => {
        this.author = response.data;
        console.log(this.author)
      })
    })
    console.log(this.postData)
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


  

}
