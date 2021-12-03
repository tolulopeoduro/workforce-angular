import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor() { }
  greeting : any = "hello";

  ngOnInit(): void {
    const now = new Date().getHours()
    this.greeting = now < 12 ? "Good Morning" : now >= 12 && now < 5 ? "Good Afternoon" :
     now >= 5 && now <= 8 ? "Good Evening" : "Welcome" 
  }

}
