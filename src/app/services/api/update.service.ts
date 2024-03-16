import { Constants } from './../../confic/constansts';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private http:HttpClient,private Constants:Constants) { }

  public async updateprofile(id : any){
    const url = `${this.Constants.API_ENDPOINT}update/${id}`;
    const response = await lastValueFrom(this.http.get(url));
    // console.log(response);
    return response ;
  }
}
