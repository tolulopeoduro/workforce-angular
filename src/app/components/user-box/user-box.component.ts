import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.scss']
})
export class UserBoxComponent implements OnInit {

  isLoggedIn : boolean = false

  userId : any = localStorage.getItem("id")
  userData : any = null

  constructor(private http : HttpService , private store : Store<{user : any}>) { }

  ngOnInit(): void {
    this.store.select('user').subscribe(res => {
      this.userData = res.data
    })
  }

}
