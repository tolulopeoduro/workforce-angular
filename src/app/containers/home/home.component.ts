import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts : any = null

  constructor(private http : HttpService) { }
  

  ngOnInit(): void {
    this.http.getRequest(`${environment.apiUrl}/post`)
    .subscribe(res => {
      this.posts = res.data
    })
  }

}
