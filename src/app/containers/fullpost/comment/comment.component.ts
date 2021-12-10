import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment : any = null
  author : any = null

  constructor(private http : HttpService) { }

  ngOnInit(): void {
    this.http.getRequest(`${environment.apiUrl}/users/${this.comment.userId}`)
    .subscribe(response  => {
      this.author = response.data;
  })
  }

}
