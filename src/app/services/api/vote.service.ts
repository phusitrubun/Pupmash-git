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

}
