import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../confic/constansts';
import { lastValueFrom } from 'rxjs';
import { ImageGetResponse } from '../../model/ImageGetResponse';
import { StatisticResponse } from '../../model/voteResponse';

@Injectable({
  providedIn: 'root'
})
export class MashImageService {

  constructor(private constants:Constants, private http:HttpClient) { }

  // to random image
  public async random(){
    const url = `${this.constants.API_ENDPOINT}mash/random?userID=${localStorage.getItem('userID')}`;
    const response = await lastValueFrom(this.http.get(url));

    return response as ImageGetResponse[];
  }

  // public async randomexcept(id: any){
  //   const url = `${this.constants.API_ENDPOINT}mash/random/:id`;
  //   const response = await lastValueFrom(this.http.get(url));

  //   return response as ImageGetResponse[];
  // }

  // getImage
  public async getImage(id : number){
    const url = `${this.constants.API_ENDPOINT}mash/${id}`;
    const response = await lastValueFrom(this.http.get(url));
    // console.log(response);

    return response as ImageGetResponse;
  }

  // elo calculate
  public async calculateElo(winnerId : number , loserId : number){
    const url = `${this.constants.API_ENDPOINT}mash/elo/${winnerId}/${loserId}`;
    const response = await lastValueFrom(this.http.post(url, {}));
    // console.log(response);

    return response
  }


  // ranks
  public async getRanks(){
    const url = `${this.constants.API_ENDPOINT}mash`;
    const response = await lastValueFrom(this.http.get(url));
    // console.log(response);

    return response as ImageGetResponse[];
  }


  // add to vote table
  public async recordVote(data : any){
    const url = `${this.constants.API_ENDPOINT}vote`;
    const response = await lastValueFrom(this.http.post(url, data));
    console.log(response);
    return response ;
  }

  // to statistic
  public async stattistic(id : number){
    const url = `${this.constants.API_ENDPOINT}vote/stat/${id}`;
    const response = await lastValueFrom(this.http.get(url));
    // console.log(response);
    return response;
  }

  public async recordStat(data : any){
    const url = `${this.constants.API_ENDPOINT}vote/stat`;
    const response = await lastValueFrom(this.http.post(url, data));
    console.log(response);
    return response;
  }




}
