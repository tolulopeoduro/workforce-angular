import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpService} from '../../services/http/http.service'

@Component({
  selector: 'app-article-link',
  templateUrl: './article-link.component.html',
  styleUrls: ['./article-link.component.scss']
})
export class ArticleLinkComponent implements OnInit {

  @Input() article : any = null;
  author : any = null
  link : any = null
  
  constructor(private http : HttpService) { }

  ngOnInit(): void {
    if (this.article.author) {
      this.http.getRequest(`${environment.apiUrl}/users/${this.article.author}`)
      .subscribe(res => {
        this.author = res.data
      })
    }
    this.link = `/post/${this.article._id}`
  }

}
