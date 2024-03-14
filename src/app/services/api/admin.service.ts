import { Injectable } from '@angular/core';
import { Constants } from '../../confic/constansts';
import { HttpClient } from '@angular/common/http';
import { first, firstValueFrom, lastValueFrom } from 'rxjs';
import { UserGetResponse } from '../../model/UserGetResponse';
import { ImageUserUpload } from '../../model/ImageGetResponse';
import { Times } from '../../model/Times';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private constants:Constants, private http:HttpClient) { }

  public async getAllUser(){
    const url = `${this.constants.API_ENDPOINT}user/`;
    const response = await lastValueFrom(this.http.get(url));
  
    return response as UserGetResponse[];
  }

  public async getImageUser(id : any){
    const url = `${this.constants.API_ENDPOINT}user/upload/${id}`;
    const response = await lastValueFrom(this.http.get(url));
    // console.log(response);
    return response as ImageUserUpload[];
  }

  public async getTimeSetting(){
    const url = `${this.constants.API_ENDPOINT}time/`;
    const response = await firstValueFrom(this.http.get(url));
    console.log(response);
    return response as Times[];
  }


  public async setTime(times : number){
    const url = `${this.constants.API_ENDPOINT}time/settimes?times=${times}`;
    const response = await lastValueFrom(this.http.put(url, {}));
    // console.log(response);
    return response ;
  }





}
