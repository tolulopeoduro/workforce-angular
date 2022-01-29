import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { clearData } from 'src/app/reducers/userActions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Output() toggleDropdown : EventEmitter<void>
  currentPath : any = null
  
  constructor(private router : Router , private store : Store<{user : any}> , private activatedRoute : ActivatedRoute) {
    this.router.events.subscribe(params => {
      this.currentPath = this.router.url
      this.router.onSameUrlNavigation = "reload"
    });
    this.toggleDropdown = new EventEmitter<void>()
  }

  userData : any = null

  
  readonly userId : any = localStorage.getItem('id')


  ngOnInit(): void {
    this.store.select('user').subscribe(res => {
      this.userData = res.data
    })
  }

  signOut = () => {
    localStorage.clear()
    this.store.dispatch(clearData())
    this.router.navigate(['/'])
  }

  handleToggle = () => this.toggleDropdown.emit()

}
