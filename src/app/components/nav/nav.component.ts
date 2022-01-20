import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clearData } from 'src/app/reducers/userActions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Output() toggleDropdown : EventEmitter<void>

  constructor(private router : Router , private store : Store<{user : any}>) {
    this.toggleDropdown = new EventEmitter<void>()
  }

  readonly userId : any = localStorage.getItem('id')

  ngOnInit(): void {
  }

  signOut = () => {
    localStorage.clear()
    this.store.dispatch(clearData())
    this.router.navigate(['/'])
  }

  handleToggle = () => this.toggleDropdown.emit()

}
