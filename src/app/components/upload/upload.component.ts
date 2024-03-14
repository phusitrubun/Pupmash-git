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
import { UploadImageService } from '../../services/api/upload-image.service';

interface UploadedImageResponse {
  imageID: number;
  url: string;
  name: string;
  score: number;
  userID: number;
  updateDate: string;
  uploadDate: string;
}

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
  keep: ImageGetResponse[] = [];
  imagekeep: ImageGetResponse[] = [];
  id: number = 0;
  guestID: boolean = false;
  imageID: number = 0;
  nameEdit: string[] = [];

  constructor(
    private router: Router,
    private tableUploadImage: UploadTableImage,
    private imageservice: ImageService,
  ) { }

  ngOnInit(): void {
    const userIdString = localStorage.getItem('userID');
    let guestID = false;

    if (userIdString) {
      console.log('userID String : ', userIdString);

      if (userIdString.length > 5) {
        guestID = true;
        console.log('guestID: ', guestID);
      } else {
        this.id = parseInt(userIdString);
      }
    }
    this.keepupload()
    console.log(guestID);
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
            this.uploading = false; // ซ่อน loading spinner เมื่อได้ลิงค์ไฟล์แล้ว
          }).catch((error: any) => {
            console.error('Error uploading image:', error);
            this.uploading = false; // ซ่อน loading spinner เมื่อเกิดข้อผิดพลาด
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
          userID: this.id,
        };
        try {
          const uploadedImage: any = await this.tableUploadImage.uploadDB(data);
          alert('อัปโหลดไฟล์เรียบร้อยแล้ว');
          this.showUploadButton[index] = false;
          this.imageUrls.splice(index, 1); // ลบรูปภาพที่อัปโหลดเสร็จแล้วออกจาก this.imageUrls

          const imageGetResponse: ImageGetResponse = {
            imageID: uploadedImage.imageID,
            url: uploadedImage.url,
            name: uploadedImage.name,
            score: uploadedImage.score,
            userID: uploadedImage.userID,
            updateDate: uploadedImage.updateDate,
            uploadDate: uploadedImage.uploadDate
          };

          this.keep.push(imageGetResponse); // เพิ่มรูปภาพที่อัปโหลดเสร็จแล้วลงใน this.keep
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

  async keepupload() {
    this.imagekeep = await this.tableUploadImage.keepupload();
    // console.log(this.imagekeep);

    if (this.imagekeep.length > 0) {
      this.keep = this.imagekeep;
      console.log('Keep = >', this.keep);
    }
  }

  async deleteImage(imageID: number) {
    // console.log('THisthis');
    // console.log(imageID);

    // Ask for confirmation before deleting
    const confirmed = confirm("ยืนยันการลบรูปภาพ?");
    if (!confirmed) {
      return; // If the user cancels, do nothing
    }

    const imageIndex = this.imagekeep.findIndex(image => image.imageID === imageID);
    if (imageIndex !== -1) {
      const deletedImageUrl = this.imagekeep[imageIndex].url;
      this.imageUrls = this.imageUrls.filter(url => url !== deletedImageUrl);

      this.imagekeep.splice(imageIndex, 1);

      if (this.imageUrls.length === 0) {
        this.showUploadButton[this.index] = false; // If no new images are left, hide the button
      }
      await this.tableUploadImage.deleteImage(imageID);
      console.log('Image deleted successfully.'); // Log deletion success
    }
  }

  currentDate: string = new Date().toISOString().slice(0, 19).replace('T', ' ');
  async editData(imageID: number) {
    console.log(imageID);

    const imageIndex = this.imagekeep.findIndex(image => image.imageID === imageID);

    if (imageIndex !== -1 && imageIndex < this.nameEdit.length) {
      const editedName = this.nameEdit[imageIndex];

      const data = {
        name: editedName,
        updateDate: this.currentDate,
        imageID: imageID
      };


      console.log(data);

      await this.tableUploadImage.editData(data);
    } else {
      console.error('Now Its current Data!');
    }
  }
}
