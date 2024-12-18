import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataApiService } from '../data-api.service';
import { T } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-coursepage',
  templateUrl: './coursepage.component.html',
  styleUrl: './coursepage.component.css'
})
export class CoursepageComponent implements OnInit {
  bookmarked:boolean=false
  show:boolean=false
  course: any;
  id:number=-1
  courseName:string=''
  pdfUrl: string | null = null;
  logged:boolean=false
  bookmark()
  {
    this.bookmarked=!this.bookmarked;
    this.api.addUrl(`users/bookmark`)
    this.api.post({Course_id:this.id}).subscribe(
      {
        next:res=>
          {
           
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
  constructor(private api:DataApiService,private router:Router,private route: ActivatedRoute)
  {
   this.id= +route.snapshot.paramMap.get('id')!;
   this.courseName=route.snapshot.paramMap.get('course')!;
  }
  ngOnInit(): void 
  {
    this.api.addUrl(`course/${this.id}`)
    this.api.getAll().subscribe(
      {
        next:res=>
          {
            this.course=res.data
            this.course=this.course[0]
            if(this.course.Course_Outline)
              this.pdfUrl = this.createPdfUrl(this.course.Course_Outline.data);

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
  logincheck(login: boolean) 
  {
    this.logged=login 
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
}
