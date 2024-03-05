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

public async urlImage(file:ImageGetResponse){
  // const formData = new FormData();
  // formData.append('file',file);

  const url = `${this.constants.API_ENDPOINT}uploadimage/uploadim`;
  // const response :any = await lastValueFrom(this.http.post(url,formData));
  // console.log(response);

  // return response.file as string;
}
}
