  import { Injectable } from '@angular/core';
  import { Constants } from '../../confic/constansts';
  import { HttpClient } from '@angular/common/http';
  import { lastValueFrom } from 'rxjs';
  import { UserGetResponse } from '../../model/UserGetResponse';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthenService {
    updateUser(id: number, updatedUser: any) {
      throw new Error('Method not implemented.');
    }

    constructor(private constants:Constants, private http:HttpClient) { }

    public async checkUser(email: string){
      const url = `${this.constants.API_ENDPOINT}authen?email=${email}`;
      const response = await lastValueFrom(this.http.get(url));
      // console.log(response);
      return response as UserGetResponse;
    }

    public async getUser(id : any){
      const url = `${this.constants.API_ENDPOINT}authen/${id}`;
      const response = await lastValueFrom(this.http.get(url));
      // console.log(response);
      return response as UserGetResponse;
    }


    public async InsertUser(data : any){
      const url = `${this.constants.API_ENDPOINT}authen`;
      const response = await lastValueFrom(this.http.post(url, data));
      return response;
    }
  }
