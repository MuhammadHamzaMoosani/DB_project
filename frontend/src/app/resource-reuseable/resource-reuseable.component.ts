import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HelperService } from '../helper.service';
import { DataApiService } from '../data-api.service';

@Component({
  selector: 'resource-reuseable',
  templateUrl: './resource-reuseable.component.html',
  styleUrl: './resource-reuseable.component.css'
})
export class ResourceReuseableComponent implements AfterViewInit,OnInit {
complete() {
  this.popup=false
}
close() {
  this.popup=false
}
  constructor(private router:Router,private helper:HelperService,private api:DataApiService){}
  course: any;
  @Input('title') title!: string;
  @Input('resourceType') resourceType!:string
  @Input('id') id!:number
  courseName:string=''
  popup:boolean=false
  currentUrl: string = '';
  // bookmarked:boolean=false
  // show:boolean=false
  // id:number=-1
  pdfUrl: string | null = null;
  logged:boolean=false
  ngOnInit(): void 
  {
    this.api.addUrl(`course/${this.id}`)
    this.api.getAll().subscribe(
      {
        next:res=>
          {
            console.log(res)
            this.course=res.data
            console.log(this.course[0])
            this.course=this.course[0]
            console.log(this.course)
            this.courseName=this.course.Course_name
            console.log(this.id)
          },
        error:er=>
          {
            console.log(er)
            // this.showAlert=true
            // setTimeout(() => {
            //   this.showAlert=false
            //   this.router.navigateByUrl('login')
            // }, 3000);
            
          }
      }
    )
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
  downloadPdf(): void {
    if (this.pdfUrl) {
      // Create an anchor element to simulate the download
      const a = document.createElement('a');
      a.href = this.pdfUrl; // Set the blob URL
      a.download = 'Course_Outline.pdf'; // Set the file name for the download
      a.click(); // Trigger the download
  
      // Clean up the object URL after download to free memory
      URL.revokeObjectURL(this.pdfUrl);
    } else {
      console.error('PDF URL is not available.');
    }
  }
  navigate(url:string)
  {
    this.router.navigateByUrl(`course/${this.courseName}/${this.id}/${url}`)
  }
  addResource() 
  {

  }
}
