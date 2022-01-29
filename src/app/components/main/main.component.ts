import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setData } from 'src/app/reducers/userActions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  fullpage : boolean = false
  dropdownActive : boolean = false

  constructor(private router : Router , private http : HttpClient , private store : Store<{user : any}> , private activatedRoute : ActivatedRoute) {
    this.router.events.subscribe(params => {
      this.fullpage = this.router.url.split('/')[1] === 'post'
    });
  }

  userData : any = null

  ngOnInit(): void {

    this.store.select('user').subscribe(res => {
      this.userData = res.data
    })

    if (localStorage.getItem('id')) {
      this.http.get(`${environment.apiUrl}/users/${localStorage.getItem('id')}`)
      .subscribe(res => this.store.dispatch(setData(res)))
    }
  }

  toggleDropdown = () => {
    this.dropdownActive = !this.dropdownActive
  }

}
