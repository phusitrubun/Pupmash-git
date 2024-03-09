import { Injectable } from '@angular/core';
import { Constants } from '../../confic/constansts';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';




@Injectable({
  providedIn: 'root'
})

export class ImageService {
    constructor(private constants: Constants, private http: HttpClient){}

    public async getImage(id : any){
        const url = `${this.constants.API_ENDPOINT}user/image/${id}`;
        const response = await lastValueFrom(this.http.get(url));
        console.log(response);
        return response;
      }

}