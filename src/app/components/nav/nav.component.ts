import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clearData } from 'src/app/reducers/userActions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private router : Router , private store : Store<{user : any}>) { }

  readonly userId : any = localStorage.getItem('id')

  ngOnInit(): void {
  }

  signOut = () => {
    localStorage.clear()
    this.store.dispatch(clearData())
    this.router.navigate(['/'])
  }

}
