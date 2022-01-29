import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-name-dialog',
  templateUrl: './name-dialog.component.html',
  styleUrls: ['./name-dialog.component.scss']
})
export class NameDialogComponent implements OnInit {

  @Output() show : EventEmitter<void>
  @Output() hide : EventEmitter<void>
  @Output() uploaded : EventEmitter<void>

  name : string = ""
  
  
  constructor(private http : HttpService) {
    this.show = new EventEmitter<void>()
    this.hide = new EventEmitter<void>()
    this.uploaded = new EventEmitter<void>()
  }
  
  ngOnInit(): void {
  }
  
  changeName = () => {
    const data = {
      userId : localStorage.getItem("id"),
      name : this.name
    }
    this.http.postRequest(`${environment.apiUrl}/users/update/name` , data , {headers : {Authorization : localStorage.getItem('token')}})
    .subscribe(res => {
      this.uploaded.emit()
    })
  }

  exit = () => this.hide.emit()

}
