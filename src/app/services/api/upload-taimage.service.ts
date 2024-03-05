import { Injectable} from "@angular/core";
import { Constants } from "../../confic/constansts";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { ImageGetResponse } from "../../model/ImageGetResponse";

@Injectable({
  providedIn:'root'
})

export class UploadTableImage{
constructor(private constants:Constants,private http:HttpClient){}

public async urlImage(file : File){
  const formData = new FormData();
  formData.append('file', file);
  // console.log(formData);

  const url = `${this.constants.API_ENDPOINT}uploadimage/`;
  const response = await lastValueFrom( this.http.post(url, FormData));
  // console.log(response);

  return response;

}

public async uploadDB(data : any){
  const url = `${this.constants.API_ENDPOINT}uploadimage/uploadDB`;
  const response = await lastValueFrom(this.http.post(url, data));
  console.log(response);
  
  return response;
}
}
