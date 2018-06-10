import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable()
export class FileManagerService {

  constructor(private restService : RestService) { }

  upload(fileToUpload: File, options) {
    const formData: FormData = new FormData();
    formData.append('upload', fileToUpload, fileToUpload.name);
    for(var key in options.keys())
    {
      formData.append(key, options[key], key);
    }
    return this.restService.post( 'UPLOAD_FILE', false, null, formData );
  }

  delete_file(key: string) {

  }

}
