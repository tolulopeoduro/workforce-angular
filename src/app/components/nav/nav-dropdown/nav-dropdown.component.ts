import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clearData } from 'src/app/reducers/userActions';

@Component({
  selector: 'app-nav-dropdown',
  templateUrl: './nav-dropdown.component.html',
  styleUrls: ['./nav-dropdown.component.scss']
})
export class NavDropdownComponent implements OnInit {

  @Output() closeDropdown : EventEmitter<void>

  constructor(private router : Router , private store : Store<{user : any}>) {
    this.closeDropdown = new EventEmitter<void>()
  }

  readonly userId : any = localStorage.getItem('id')

  userData : any = null

  handleDropdownClose = () => {
    this.closeDropdown.emit()
  }

  logOut = () => {
    localStorage.clear()
    this.store.dispatch(clearData())
    this.router.navigate(['/'])
    this.closeDropdown.emit()
  }

  ngOnInit(): void {
    this.store.select('user').subscribe(res => {
      this.userData = res.data
    })
  }

}
