import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-img-dialog',
  templateUrl: './img-dialog.component.html',
  styleUrls: ['./img-dialog.component.scss']
})
export class ImgDialogComponent implements OnInit {

  @Output() show : EventEmitter<void>
  @Output() hide : EventEmitter<void>
  @Output() uploaded : EventEmitter<void>

  constructor(private http : HttpService) {
    this.show = new EventEmitter<void>()
    this.hide = new EventEmitter<void>()
    this.uploaded = new EventEmitter<void>()
   }

  file : any = localStorage.getItem('id') + "_profile"

  ngOnInit(): void {
  }

  imgChangeEvt: any = '';
  cropImgPreview: any = '';

  onFileChange(event: any): void {
      this.imgChangeEvt = event;
  }
  cropImg(e: ImageCroppedEvent) {
      this.cropImgPreview = e.base64;
      this.file = base64ToFile(this.cropImgPreview)
  }

  imgLoad() {
      // display cropper tool
  }

  initCropper() {
      // init cropper
  }
  
  imgFailed() {
      // error msg
  }

  submit = () => {
    const formData = new FormData();
    formData.append('userId' , `${localStorage.getItem('id')}`)
    formData.append('file' , this.file , `${localStorage.getItem('id')}_profile`);
    this.http.postRequest(`${environment.apiUrl}/users/update` , formData , {})
    .subscribe(res => {
      console.log(res)
      this.uploaded.emit()
    })
  }

  exit = () => this.hide.emit()

}
