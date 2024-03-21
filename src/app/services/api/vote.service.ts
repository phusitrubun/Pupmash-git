import { Injectable } from '@angular/core';
import { Constants } from '../../confic/constansts';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Rank } from '../../model/voteResponse';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private constants: Constants, private http: HttpClient) { }

  public async voteshow() {
    const url = `${this.constants.API_ENDPOINT}vote/ranks`
    const response = await lastValueFrom(this.http.get(url));
    return response as Rank[];
  }

  public async ranksadmin() {
    const url = `${this.constants.API_ENDPOINT}vote/ranksadmin`
    const response = await lastValueFrom(this.http.get(url));
    return response as Rank[];
  }

  
  
  // ข้อมูลทั้งหมดของ user นั้น ที่ใส่ในกราฟ
  public async stattistic(id : number){
    const url = `${this.constants.API_ENDPOINT}vote/stat/${id}`;
    const response = await lastValueFrom(this.http.get(url));
    // console.log(response);
    return response;
  }


  // ขอ้มูลของรูปภาพรูปเดียว
  public async chart_image(id : any){
    const url = `${this.constants.API_ENDPOINT}vote/stat/image/${id}`;
    const response = await lastValueFrom(this.http.get(url));
    console.log(response);
    return response;
  }


}
