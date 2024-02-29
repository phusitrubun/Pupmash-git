import { Injectable } from '@angular/core';
import { Constants } from '../../confic/constansts';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { UserGetResponse } from '../../model/UserGetResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor(private constants:Constants, private http:HttpClient) { }

  public async checkUser(email: string){
    const url = `${this.constants.API_ENDPOINT}authen?email=${email}`;
    const response = await lastValueFrom(this.http.get(url));
    // console.log(response);
    return response as UserGetResponse;
  }

  public async getUser(id : number){
    const url = `${this.constants.API_ENDPOINT}authen/${id}`;
    const response = await lastValueFrom(this.http.get(url));
    // console.log(response);
    return response as UserGetResponse;
  }
}
