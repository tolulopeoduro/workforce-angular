import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private router : Router) { }

  readonly userId : any = localStorage.getItem('id')

  ngOnInit(): void {
  }

  signOut = () => {
    localStorage.clear()
    this.router.navigate(['/login'])
  }

}
