import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { setData } from 'src/app/reducers/userActions';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts : any = null
  readonly userId : any = localStorage.getItem('id')


  constructor(private http : HttpService , private store : Store<{user : any}> , private titleService : Title) { }
  

  ngOnInit(): void {
    this.titleService.setTitle("Workforce")
    this.http.getRequest(`${environment.apiUrl}/post`)
    .subscribe(res => {
      this.posts = res.data
    })
  }

}
