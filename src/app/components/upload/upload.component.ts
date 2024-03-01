import { Component } from '@angular/core';
import { Header3Component } from "../all-header/header3/header3.component";

@Component({
    selector: 'app-upload',
    standalone: true,
    templateUrl: './upload.component.html',
    styleUrl: './upload.component.scss',
    imports: [Header3Component]
})
export class UploadComponent {
  imageUrl1: string = "../../assets/maxresdefault.jpg";
  imageUrl2: string = "../../assets/maxresdefault.jpg";
  imageUrl3: string = "../../assets/maxresdefault.jpg";
  imageUrl4: string = "../../assets/maxresdefault.jpg";
  imageUrl5: string = "../../assets/maxresdefault.jpg";
  // Add imageUrl2, imageUrl3, ... for other image upload fields if needed

  onFileSelected(event: any, targetElementId: string) {
    const file = event.target.files[0];
    if (file) {
      this.readURL(file, targetElementId);
    }
  }

  readURL(file: File, targetElementId: string) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const targetElement = document.getElementById(targetElementId);
      if (targetElement) {
        targetElement.style.backgroundImage = `url(${e.target.result})`;
      }
    };
    reader.readAsDataURL(file);
  }

  deleteImage(targetElementId: string) {
    const targetElement = document.getElementById(targetElementId);
    if (targetElement) {
      targetElement.style.backgroundImage = ''; // Clear background image
    }
    // Optionally, you can reset imageUrl1, imageUrl2, ... here
  }
}
