import { Component, OnInit } from '@angular/core';
import { Header3Component } from '../all-header/header3/header3.component';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UploadTableImage } from '../../services/api/upload-taimage.service';
import { ImageGetResponse } from '../../model/ImageGetResponse';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';



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

    // this.updateCurrentDateInDB();
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
        // Show SweetAlert instead of using alert
        await Swal.fire({
          icon: 'warning',
          title: 'Warning',
          text: 'You cannot add more images because you already have a maximum of 5 images',
          confirmButtonText: 'OK'
        });
      }      
    }
  }


  async uploadImage(index: number, name: HTMLInputElement) {
  const confirmation = await Swal.fire({
    icon: 'question',
    title: 'Confirm Upload',
    text: 'Are you sure you want to upload this image?',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  });

  if (confirmation.isConfirmed) {
    this.uploading = true; // Start showing progress bar

    if (this.someurl) {
      this.uploading = false; // Hide progress bar
      const data = {
        url: this.someurl,
        name: name.value,
        score: 1000,
        userID: this.id,
      };

      try {
        // Temporarily change uploadedImage data type to any
        const uploadedImage: any = await this.tableUploadImage.uploadDB(data);
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'File uploaded successfully!'
        });
        this.showUploadButton[index] = false;
        this.imageUrls.splice(index, 1); // Remove uploaded image from this.imageUrls

        const imageGetResponse: ImageGetResponse = {
          imageID: uploadedImage.imageID,
          url: uploadedImage.url,
          name: uploadedImage.name,
          score: uploadedImage.score,
          userID: uploadedImage.userID,
          updateDate: uploadedImage.updateDate,
          uploadDate: uploadedImage.uploadDate
        };

        this.keep.push(imageGetResponse); // Add uploaded image to this.keep
        this.nameEdit.push(uploadedImage.name); // Add image name to this.nameEdit
        this.keepupload();

        // Update time after file upload
        // await this.updateCurrentDateInDB();

      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle error
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while uploading the file'
        });
      }
    }
  } else {
    await Swal.fire({
      icon: 'info',
      title: 'Cancelled',
      text: 'File upload cancelled'
    });
    this.uploading = false; // Hide progress bar
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
  const confirmation = await Swal.fire({
    icon: 'question',
    title: 'Confirm Deletion',
    text: 'Are you sure you want to delete this image?',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  });

  if (!confirmation.isConfirmed) {
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
      // console.log(data);
      await this.tableUploadImage.editData(data);
    } else {
      console.error('Now Its current Data!');
    }
  }

}
