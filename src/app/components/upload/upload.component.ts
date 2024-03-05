import { Component, OnInit } from '@angular/core';
import { Header3Component } from '../all-header/header3/header3.component';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UploadImageService } from '../../services/api/upload-image.service';
import { UploadTableImage } from '../../services/api/upload-taimage.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
  imports: [Header3Component, NgIf, CommonModule, FormsModule],
})
export class UploadComponent implements OnInit {
  imageUrls: (string | ArrayBuffer)[] = [];
  showPopup: boolean = false;
  showUploadButton: boolean[] = []; // เริ่มต้นปุ่มไม่แสดง
  index: number = -1;
  userId: any;
  name: string = '';
  someurl: any;
  files: File [] = [];

  constructor(
    private router: Router,
    private tableUploadImage: UploadTableImage
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userID');
  }
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
          this.showUploadButton[this.index] = true; // เมื่อมีรูปใหม่เพิ่มเข้ามาให้แสดงปุ่ม
        };
        reader.readAsDataURL(file);
        this.someurl = await this.tableUploadImage.urlImage(file);
        console.log(this.someurl);
        this.index++;
      }
      if (files.length > remainingSlots) {
        alert(
          'ไม่สามารถเพิ่มรูปภาพเพิ่มเติมได้ เนื่องจากคุณมีรูปภาพอยู่แล้วสูงสุด 5 รูป'
        );
      }
    }
  }


  async uploadImage(index: number) {
    if (confirm('คุณต้องการยืนยันการอัปโหลดหรือไม่?')) {
      const data = {
        url: this.someurl,
        name: this.name,
        score: 1000,
        userID: this.userId,
      };
      await this.tableUploadImage.uploadDB(data);

    
      alert('อัปโหลดไฟล์เรียบร้อยแล้ว');
      this.showUploadButton[index] = false; // ซ่อนปุ่ม Upload Image ด้วยการเซ็ต showUploadButton ที่ index ให้เป็น false
    } else {
      // ถ้าผู้ใช้กดยกเลิก
      alert('การอัปโหลดไฟล์ถูกยกเลิก');
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
  // confirmUpload(): void {
}

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
