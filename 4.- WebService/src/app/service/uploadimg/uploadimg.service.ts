import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadimgService {

  constructor() { }

  uploadFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
        formData.append('upload_preset', environment.upload_preset);
        fetch(environment.cloudinary_url, {
          method: 'POST',
          body: formData
        }).then( (response) => {
          return response.json();
        }).then( (data) => { 
          resolve(data.secure_url)
        }).catch( error => {
          reject(error);
        })
      }

    })
  }
  
}
