import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../confic/constansts';
import { lastValueFrom } from 'rxjs';
import { ImageGetResponse } from '../../model/ImageGetResponse';

@Injectable({
  providedIn: 'root'
})
export class MashImageService {

  constructor(private constants:Constants, private http:HttpClient) { }

  public async random(){
    const url = `${this.constants.API_ENDPOINT}mash/random`;
    const response = await lastValueFrom(this.http.get(url));
        
    return response as ImageGetResponse[];
  }

  public async getImage(id : number){
    const url = `${this.constants.API_ENDPOINT}mash/${id}`;
    const response = await lastValueFrom(this.http.get(url));
    // console.log(response);
    
    return response as ImageGetResponse;
  }
}
