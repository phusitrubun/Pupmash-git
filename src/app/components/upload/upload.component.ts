import { Component, OnInit } from '@angular/core';
import { Header3Component } from '../all-header/header3/header3.component';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// import { UploadImageService } from '../../services/api/upload-image.service';
import { UploadTableImage } from '../../services/api/upload-taimage.service';
import { ImageGetResponse } from '../../model/ImageGetResponse';
import { ImageService } from '../../services/api/image.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-upload',
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
  imports: [Header3Component, NgIf, CommonModule, FormsModule, RouterLink, MatProgressSpinnerModule],
})
export class UploadComponent implements OnInit {
  imageUrls: (string | ArrayBuffer)[] = [];
  showPopup: boolean = false;
  showUploadButton: boolean[] = []; // เริ่มต้นปุ่มไม่แสดง
  index: number = -1;
  userId: any;
  name: string = '';
  someurl: any;
  files: File[] = [];
  keep: ImageGetResponse[]  = [];
  imagekeep: ImageGetResponse[] = [];

  constructor(
    private router: Router,
    private tableUploadImage: UploadTableImage,
    private imageservice : ImageService
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userID');
    this.keepupload()
    
  }

  uploading: boolean = false;

  async previewImages(event: any): Promise<void> {
    const files = event.target.files;

    if (files) {
      const remainingSlots = 5 - this.imageUrls.length;
      const filesToAdd = Math.min(files.length, remainingSlots);
      for (let i = 0; i < filesToAdd; i++) {
        const file = files[i];
        this.files.push(file);

        const reader = new FileReader();
        reader.onload = async () => {
          this.imageUrls.push(reader.result as string | ArrayBuffer);
          this.index = this.imageUrls.length - 1; // กำหนดค่า index ใหม่
          this.showUploadButton[this.index] = true; // เมื่อมีรูปใหม่เพิ่มเข้ามาให้แสดงปุ่ม
        };
        reader.readAsDataURL(file);
        this.uploading = true;

        console.log(this.index);
        console.log(this.imagekeep.length + 1);
        
        if (this.imagekeep.length + 1 <= 5) {
          // ส่งรูปภาพไปยัง Angular service เพื่ออัปโหลดลงใน Firebase Storage
          this.tableUploadImage.urlImage(file).then((url: string) => {
            this.someurl = url;
            console.log(this.someurl);
            
          }).catch((error: any) => {
            console.error('Error uploading image:', error);
          });
        }
      }
      if (files.length > remainingSlots) {
        alert(
          'ไม่สามารถเพิ่มรูปภาพเพิ่มเติมได้ เนื่องจากคุณมีรูปภาพอยู่แล้วสูงสุด 5 รูป'
        );
      }

      
    }
  }

  

async uploadImage(index: number, name: HTMLInputElement) {
    if (confirm('คุณต้องการยืนยันการอัปโหลดหรือไม่?')) {
        this.uploading = true; // เริ่มแสดงแถบความคืบหน้า
        if (this.someurl) {
          this.uploading = false; // ปิดแถบความคืบหน้า
            const data = {
                url: this.someurl,
                name: name.value,
                score: 1000,
                userID: this.userId,
            };
            try {
                await this.tableUploadImage.uploadDB(data);
                alert('อัปโหลดไฟล์เรียบร้อยแล้ว');
                this.showUploadButton[index] = false;
                this.keepupload();
            } catch (error) {
                console.error('Error uploading image:', error);
                // Handle error
                alert('เกิดข้อผิดพลาดในการอัปโหลดไฟล์');
            } 
        } 
    } else {
        alert('การอัปโหลดไฟล์ถูกยกเลิก');
        this.uploading = false; // ปิดแถบความคืบหน้า
    }
}


  deleteImage(imageUrl: string | ArrayBuffer): void {
    if (typeof imageUrl === 'string') {
      this.imageUrls = this.imageUrls.filter((url) => url !== imageUrl);
      if (this.imageUrls.length === 0) {
        this.showUploadButton[this.index] = false; // ถ้าไม่มีรูปใหม่แล้วให้ซ่อนปุ่ม
      }
    }
  }

  async keepupload(){
    this.imagekeep = await this.tableUploadImage.keepupload();
    console.log(this.imagekeep);

    if (this.imagekeep.length > 0) {
        this.keep = this.imagekeep;
        console.log('Keep = >',this.keep);
    }
}


}
// confirmUpload(): void {
//   // ทำการอัปโหลดรูปภาพต่อไป
//   this.showPopup = false;
//   this.showUploadButton[this.index] = false; // ซ่อนปุ่ม Upload Image
// }

// cancelUpload(): void {
//   // ยกเลิกการอัปโหลดรูปภาพที่เพิ่งเลือก
//   this.imageUrls.pop();
//   if (this.imageUrls.length === 0) {
//     this.showUploadButton[this.index] = false; // ถ้าไม่มีรูปใหม่แล้วให้ซ่อนปุ่ม
//   }
//   this.showPopup = false;
// }
