import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HelperService } from '../helper.service';
import { DataApiService } from '../data-api.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'resource-reuseable',
  templateUrl: './resource-reuseable.component.html',
  styleUrl: './resource-reuseable.component.css'
})
export class ResourceReuseableComponent implements AfterViewInit,OnInit {
  showAlert=false
  message:string=''
  success:boolean=false;
  error:boolean=false;
  login: boolean=false;

complete() {
  this.popup=false
}
close() {
  this.popup=false
}
  constructor(private router:Router,private helper:HelperService,private api:DataApiService){}
  course: any;
  resources: any;
  @Input('title') title!: string;
  @Input('resourceType') resourceType!:string
  @Input('resourceApi') resourceApi!:string
  @Input('id') id!:number
  @Input('apiUrl') url!:string  
  courseName:string=''
  popup:boolean=false
  currentUrl: string = '';
  done:boolean=false
  // bookmarked:boolean=false
  // show:boolean=false
  // id:number=-1
  pdfUrl: string | null = null;
  logged:boolean=false
  ngOnInit(): void 
  {
    this.api.addUrl(`course/${this.id}`);
    this.api.getAll().pipe(
      switchMap((res: any) => {
        console.log(res);
        this.course = res.data[0];
        this.courseName = this.course.Course_name;
        console.log(this.course);
        console.log(this.id);
    
        const apiObject = { id: this.course.Course_ID, type: this.resourceApi };
        this.api.addUrl(`course/materials`);
        return this.api.post(apiObject);
      })
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        this.resources=res.materials
        console.log(this.resources);
      },
      error: (err: any) => {
        console.error(err);
        // Handle error
        // this.showAlert = true;
        // setTimeout(() => {
        //   this.showAlert = false;
        //   this.router.navigateByUrl('login');
        // }, 3000);
      }
    });

  }
  ngAfterViewInit(): void {
    
   this.currentUrl=this.helper.getUrl()
    let splitString=this.currentUrl.split('/')
    this.currentUrl=splitString[4]
    console.log(this.currentUrl)
  }
  openPopUp()
  {
    this.popup=true
    console.log(this.popup)
  }
  createPdfUrl(bufferData: number[]): string {
    // Convert buffer array into Uint8Array
    const byteArray = new Uint8Array(bufferData);

    // Create a Blob from the binary data
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Generate a URL for the Blob
    return URL.createObjectURL(blob);
  }
  downloadPdf(material_name:string): void {
    if (this.pdfUrl) {
      // Create an anchor element to simulate the download
      console.log(material_name)
      const a = document.createElement('a');
      a.href = this.pdfUrl; // Set the blob URL
      a.download = `${material_name}.pdf`; // Set the file name for the download
      a.click(); // Trigger the download
  
      // Clean up the object URL after download to free memory
      URL.revokeObjectURL(this.pdfUrl);
    } else {
      console.error('PDF URL is not available.');
    }
  }
  openPDF(index:number)
  {
    if(this.resources[index].Material_File){
      this.pdfUrl = this.createPdfUrl(this.resources[index].Material_File.data);
      window.open(this.pdfUrl, '_blank');
    }
  }
  download(index: number) {
    if(this.resources[index].Material_File)
      this.pdfUrl = this.createPdfUrl(this.resources[index].Material_File.data);
    console.log(this.pdfUrl)
    this.downloadPdf(this.resources[index].Material_Description)
  }
  navigate(url:string)
  {
    this.router.navigateByUrl(`course/${this.courseName}/${this.id}/${url}`)
  }
  logincheck(login: boolean) 
  {
    this.login=login 
    console.log(login)
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

  submit(form: any): void {
    if (!this.selectedFile) {
      alert('Please select a file');
      return;
    }
  
    // Create a FormData object
    const formData = new FormData();
    formData.append('material_description', form.value.material_description);
    formData.append('course_id',this.course.Course_ID);
    formData.append('material_type', this.resourceApi);
    formData.append('file', this.selectedFile); // Append the file
  
    this.api.addUrl('upload/');
    console.log(this.selectedFile);
  
    this.api.post(formData).subscribe(
      {
        next: (res) => {
          this.showAlert = true;
          this.error = false;
          this.success = true;
          this.message = res.message;
          this.close()
          setTimeout(() => {
            this.showAlert = false;
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
  
}
