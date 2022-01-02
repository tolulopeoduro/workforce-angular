import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  author : any = null
  @Input() user : any
  @Input() date : any
  @Input() showActions : any
  constructor(private http : HttpService) { }

  ngOnInit(): void {
    this.http.getRequest(`${environment.apiUrl}/users/${this.user}`)
    .subscribe(response  => {
      this.author = response.data;
      
    })
  }

}
