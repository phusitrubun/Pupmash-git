import { Component } from '@angular/core';
import { Header3Component } from "../all-header/header3/header3.component";
import { CommonModule, NgIf } from '@angular/common';

@Component({
    selector: 'app-upload',
    standalone: true,
    templateUrl: './upload.component.html',
    styleUrl: './upload.component.scss',
    imports: [Header3Component,NgIf,CommonModule]
})
export class UploadComponent {
  imageUrls: (string | ArrayBuffer)[] = [];
    showPopup: boolean = false;
    showUploadButton: boolean = false; // เริ่มต้นปุ่มไม่แสดง

    previewImages(event: any): void {
      const files = event.target.files;
      if (files) {
        const remainingSlots = 5 - this.imageUrls.length;
        const filesToAdd = Math.min(files.length, remainingSlots);
        for (let i = 0; i < filesToAdd; i++) {
          const file = files[i];
          const reader = new FileReader();
          reader.onload = () => {
            this.imageUrls.push(reader.result as string | ArrayBuffer);
            this.showUploadButton = true; // เมื่อมีรูปใหม่เพิ่มเข้ามาให้แสดงปุ่ม
          };
          reader.readAsDataURL(file);
        }
        if (files.length > remainingSlots) {
          alert("ไม่สามารถเพิ่มรูปภาพเพิ่มเติมได้ เนื่องจากคุณมีรูปภาพอยู่แล้วสูงสุด 5 รูป");
        }
      }
    }

    confirmUpload(): void {
      // ทำการอัปโหลดรูปภาพต่อไป
      this.showPopup = false;
      this.showUploadButton = false; // ซ่อนปุ่ม Upload Image
    }

    cancelUpload(): void {
      // ยกเลิกการอัปโหลดรูปภาพที่เพิ่งเลือก
      this.imageUrls.pop();
      if (this.imageUrls.length === 0) {
        this.showUploadButton = false; // ถ้าไม่มีรูปใหม่แล้วให้ซ่อนปุ่ม
      }
      this.showPopup = false;
    }

    deleteImage(imageUrl: string | ArrayBuffer): void {
      if (typeof imageUrl === 'string') {
        this.imageUrls = this.imageUrls.filter(url => url !== imageUrl);
        if (this.imageUrls.length === 0) {
          this.showUploadButton = false; // ถ้าไม่มีรูปใหม่แล้วให้ซ่อนปุ่ม
        }
      }
    }

    uploadImage(): void {
      if (confirm("คุณต้องการยืนยันการอัปโหลดหรือไม่?")) {
        // ทำการอัปโหลดไฟล์เมื่อผู้ใช้กดตกลง
        // ตรงนี้คุณสามารถเรียกใช้งาน API หรือโมดูลที่เกี่ยวข้องกับการอัปโหลดไฟล์ได้
        // เช่น this.http.post() หรือ this.uploadService.uploadFile() เป็นต้น
        alert("อัปโหลดไฟล์เรียบร้อยแล้ว");
        this.showUploadButton = false; // ซ่อนปุ่ม Upload Image
      } else {
        // ถ้าผู้ใช้กดยกเลิก
        alert("การอัปโหลดไฟล์ถูกยกเลิก");
      }
    }
  }


