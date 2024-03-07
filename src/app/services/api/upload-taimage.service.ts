import { Injectable} from "@angular/core";
import { Constants } from "../../confic/constansts";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { ImageGetResponse, Keep } from "../../model/ImageGetResponse";

@Injectable({
  providedIn:'root'
})


export class UploadTableImage {
  constructor(private constants: Constants, private http: HttpClient) {}

  public async urlImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.constants.API_ENDPOINT}uploadimage/`;
    try {
      const response: any = await this.http.post<any>(url, formData).toPromise();
      return response.file;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }


  public async uploadDB(data: any) {
    const url = `${this.constants.API_ENDPOINT}uploadimage/uploadDB`;
    const response = await lastValueFrom(this.http.post<any>(url, data)); // แก้ไขตรงนี้
    console.log(response);

    return response;
  }

  public async keepupload(){
    const url =`${this.constants.API_ENDPOINT}uploadimage/${localStorage.getItem("userID")}`;
    const response = await lastValueFrom(this.http.get(url));

    return response as ImageGetResponse[];
  }
}

