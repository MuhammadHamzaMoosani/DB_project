import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormElement } from '../util/interface';

@Component({
  selector: 'archieve-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent implements OnInit {
@Input('formElement') form!:FormElement[]
same_line:FormElement[]=[]

submit(form: any): void {
  if (!this.selectedFile) {
    alert('Please select a file');
    return;
  }

  // Create a FormData object
  const formData = new FormData();
  // formData.append('material_description', form.value.material_description);
  // formData.append('course_id',this.course.Course_ID);
  // formData.append('material_type', this.resourceApi);
  // formData.append('file', this.selectedFile); // Append the file

  // this.api.addUrl('upload/');
  // console.log(this.selectedFile);

  // this.api.post(formData).subscribe(
  //   {
  //     next: (res) => {
  //       this.showAlert = true;
  //       this.error = false;
  //       this.success = true;
  //       this.message = res.message;
  //       setTimeout(() => {
  //         this.showAlert = false;
  //       }, 1000);
  //     },
  //     error: (er) => {
  //       this.message = er.message || 'Upload failed';
  //       this.success = false;
  //       this.error = true;
  //       this.showAlert = true;
  //       setTimeout(() => {
  //         this.showAlert = false;
  //       }, 3000);
  //     },
  //   }
  // );
}
selectedFile: File | null = null;

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Get the selected file
      console.log('Selected file:', this.selectedFile);
    }
    console.log(input)
  }
ngOnInit(): void {
  // this.same_line=this.form.filter(element=>element.same_line)
}

}
