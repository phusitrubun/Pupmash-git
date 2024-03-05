import { Injectable } from '@angular/core';
import { Constants } from '../../confic/constansts';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private constants:Constants, private http:HttpClient) { }

  public async urlImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    // console.log(formData);

    const url = `${this.constants.API_ENDPOINT}upload/`;
    const response = await lastValueFrom( this.http.post(url, FormData));
    console.log(response);

    return response;
  }
}
