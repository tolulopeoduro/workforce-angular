import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.scss']
})
export class UserBoxComponent implements OnInit {

  isLoggedIn : boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
