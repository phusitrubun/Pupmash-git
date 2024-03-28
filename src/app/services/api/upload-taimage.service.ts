import { Injectable} from "@angular/core";
import { Constants } from "../../confic/constansts";
import { HttpClient } from "@angular/common/http";
import { catchError, lastValueFrom } from "rxjs";
import { ImageGetResponse} from "../../model/ImageGetResponse";

@Injectable({
  providedIn:'root'
})


export class UploadTableImage {
  constructor(private constants: Constants, private http: HttpClient) {}

  // uploadprofile
  public async urlImageProfile(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.constants.API_ENDPOINT}upload/`;
    try {
      const response = await lastValueFrom(this.http.post(url, formData).pipe(catchError(error => {
        throw new Error(`Failed to upload image: ${error}`);
      })));
      // console.log(response);
      return response;
    } catch (error) {
      // console.error(error);
      throw new Error(`Failed to upload image: ${error}`);
    }
  }


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
    const response = await lastValueFrom(this.http.post(url, data)); // แก้ไขตรงนี้
    console.log(response);

    return response;
  } 

  public async keepupload(){
    const url =`${this.constants.API_ENDPOINT}uploadimage/${localStorage.getItem("userID")}`;
    const response = await lastValueFrom(this.http.get(url));

    return response as ImageGetResponse[];
  }

  public async deleteImage(id : number){
    const url = `${this.constants.API_ENDPOINT}uploadimage/delete/${id}`;
    const response = await lastValueFrom(this.http.put(url, {}));
    // console.log(response);
    return response;
  }

  public async editData(data : any){
    const url = `${this.constants.API_ENDPOINT}uploadimage/edit`;
    const response = await lastValueFrom(this.http.put(url, data));
    // console.log(response);
    return response;
  }
}

