import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/service/upload-file.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files: Set<File>;


  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
  }

  onChange(event) {
    //console.log(event);
    const selectedFiles = <FileList>event.srcElement.files;
    //document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);    //mostra os nomes dos arquivos no input
      this.files.add(selectedFiles[i]);         //adiciona no files para enviar para o servidor node
    }
    const teste = document.getElementById('customFileLabel').innerHTML = fileNames.join(', ');
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.uploadService.upload(this.files, `${environment.BASE_URL}/upload`)
          .subscribe(res => console.log('Upload concluído'))
    }
  }

}
