import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormElement } from '../util/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { DataApiService } from '../data-api.service';

@Component({
  selector: 'archieve-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent implements OnInit {
@Input('formElement') form!:FormElement[]
@Input('ApiUrl') apiUrl!:string
@Input('course') course: { [key: string]: any } = {}; // Ensure it's initialized
showAlert=false
message:string=''
success:boolean=false;
error:boolean=false;
same_line:FormElement[]=[]
constructor(private api:DataApiService,private router:Router)
{

}
submit(form: any): void {
  if (!this.selectedFile) {
    alert('Please select a file');
    return;
  }

  // Create a FormData object
  const formData = new FormData();

  // Iterate over the form elements and collect form values dynamically
  this.form.forEach((element) => {
    const fieldValue = form.value[element.name]; // Get the field value by name
    if (fieldValue !== undefined && fieldValue !== null) {
      formData.append(element.name, fieldValue);
    }
  });
  formData.append('file',this.selectedFile)
  console.log(formData)

  this.api.addUrl(this.apiUrl);
  console.log(this.selectedFile);

  this.api.post(formData).subscribe(
    {
      next: (res) => {
        this.showAlert = true;
        this.error = false;
        this.success = true;
        this.message = res.message;
        setTimeout(() => {
          this.showAlert = false;
          this.router.navigateByUrl('fffeefefe/admin/homepage')
        }, 1000);
      },
      error: (er) => {
        this.message = er.message || 'Upload failed';
        this.success = false;
        this.error = true;
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      },
    }
  );
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
