import { Component, OnInit } from '@angular/core';
import { Header3Component } from '../all-header/header3/header3.component';
import { CommonModule, NgIf } from '@angular/common';
import { UploadTableImage } from '../../services/api/upload-taimage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
  imports: [Header3Component, NgIf, CommonModule,FormsModule],
})
export class UploadComponent implements OnInit {
  imageUrls: (string | ArrayBuffer)[] = [];
  showPopup: boolean = false;
  showUploadButton: boolean[] = []; // เริ่มต้นปุ่มไม่แสดง
  index: number = -1;
  userId: any;
  name: string = '';
  someurl:string = '';
  constructor(private uploadtableimage : UploadTableImage,private router:Router,private http:HttpClient){  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userID');
  }
  previewImages(event: any): void {
    const files = event.target.files;
    if (files) {
      const remainingSlots = 5 - this.imageUrls.length;
      const filesToAdd = Math.min(files.length, remainingSlots);
      for (let i = 0; i < filesToAdd; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload =  () => {
          // this.someurl = this.uploadtableimage.urlImage(file);
          // console.log(this.someurl);
          this.imageUrls.push(reader.result as string | ArrayBuffer);
          this.showUploadButton[this.index] = true; // เมื่อมีรูปใหม่เพิ่มเข้ามาให้แสดงปุ่ม


        };
        reader.readAsDataURL(file);
        this.index++;
      }
      if (files.length > remainingSlots) {
        alert(
          'ไม่สามารถเพิ่มรูปภาพเพิ่มเติมได้ เนื่องจากคุณมีรูปภาพอยู่แล้วสูงสุด 5 รูป'
        );
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

  deleteImage(imageUrl: string | ArrayBuffer): void {
    if (typeof imageUrl === 'string') {
      this.imageUrls = this.imageUrls.filter((url) => url !== imageUrl);
      if (this.imageUrls.length === 0) {
        this.showUploadButton[this.index] = false; // ถ้าไม่มีรูปใหม่แล้วให้ซ่อนปุ่ม
      }
    }
  }

  async uploadImage(index: number) {
    console.log(index);

    if (confirm('คุณต้องการยืนยันการอัปโหลดหรือไม่?')) {
      // ทำการอัปโหลดไฟล์เมื่อผู้ใช้กดตกลง
      // ตรงนี้คุณสามารถเรียกใช้งาน API หรือโมดูลที่เกี่ยวข้องกับการอัปโหลดไฟล์ได้
      // เช่น this.http.post() หรือ this.upLoadService.uploadFile() เป็นต้น
      alert('อัปโหลดไฟล์เรียบร้อยแล้ว');
      this.showUploadButton[index] = false; // ซ่อนปุ่ม Upload Image ด้วยการเซ็ต showUploadButton ที่ index ให้เป็น false
    } else {
      // ถ้าผู้ใช้กดยกเลิก
      alert('การอัปโหลดไฟล์ถูกยกเลิก');
    }
  }
}
