import { ImageGetResponse } from './../../model/ImageGetResponse';
import { Injectable } from '@angular/core';
import { Constants } from '../../confic/constansts';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private constants: Constants, private http: HttpClient) { }

  public async urlImage(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.constants.API_ENDPOINT}upload/`;
    try {
      const response = await lastValueFrom(this.http.post(url, formData).pipe(catchError(error => {
        throw new Error(`Failed to upload image: ${error}`);
      })));
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to upload image: ${error}`);
    }
  }

  

}
