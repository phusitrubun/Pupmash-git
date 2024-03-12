import { Injectable } from '@angular/core';
import { Constants } from '../../confic/constansts';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { UserGetResponse } from '../../model/UserGetResponse';
import { ImageUserUpload } from '../../model/ImageGetResponse';

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
  
    return response as ImageUserUpload[];
  }



}
