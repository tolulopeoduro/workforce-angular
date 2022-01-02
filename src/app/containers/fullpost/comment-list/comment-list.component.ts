import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  
  @Input() comments : any = null;
  author : any = null;

  constructor(private http : HttpService) { }


  ngOnInit(): void {
    this.http.getRequest(`${environment.apiUrl}/users/${this.author.userId}`)
      .subscribe(response  => {
        this.author = response.data;
    })
  }

}
