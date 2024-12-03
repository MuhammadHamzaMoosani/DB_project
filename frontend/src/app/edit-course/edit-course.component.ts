import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataApiService } from '../data-api.service';
import { FormElement } from '../util/interface';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent implements OnInit {
  logged: boolean = false;
  course: any;
  id: number = -1;
  courseName: string = '';
  pdfUrl: string | null = null;

  constructor(private api: DataApiService, private router: Router, private route: ActivatedRoute,private renderer: Renderer2) {
    // Safely parse route parameters
    this.id = +(route.snapshot.paramMap.get('id') || '-1');
    this.courseName = route.snapshot.paramMap.get('course') || '';
  }
  formElement:FormElement[]=[
    
    {
      label: 'Course Title',
      type: 'input',
      input_type: 'text',
      name: 'Course_name',
      width: '56%',
      placeholder:'Enter Course title'
    },
    {
      label: 'Course Code',
      type: 'input',
      input_type: 'text',
      name: 'Course_Code',
      width: '20%',
      placeholder:'Course Code'
    },
    {
      label: 'Semester/Year',
      type: 'input',
      input_type: 'text',
      name: 'Semester_Year',
      width: '20%',
      placeholder:'semester/year'
    },
    {
      label: 'Course Type',
      type: 'select',
      name: 'Course_type',
      options: ['Under-Graduate', 'Graduate', 'Post_Graduate'],
      width: '56%'
    },
    {
      label: 'Course Department',
      type: 'select',
      options: ['BSCS', 'BBA', 'BSSS', 'BSECO', 'BSAF', 'BSEM', 'BSMath'],
      name: 'Program',
      width: '20%'
    },
    
    {
      label: 'Status ',
      type: 'select',
      options: ['Active', 'Archieved'],
      name: 'Course_Status',
      width: '20%'
    },
   
    {
      label: 'Description',
      type: 'textarea',
      name: 'Course_Description',
      width: '100%',
      placeholder:'Some Description'
    },
    {
      label: 'Course Image',
      type: 'input',
      input_type: 'text',
      name: 'Course_image',
      width: '49%',
      placeholder:'image_link'
    },
    {
      label: 'School',
      type: 'input',
      input_type: 'text',
      name: 'School',
      width: '49%',
      placeholder:'image_link'
    },
    {
      label: '',
      type: 'fileUpload',
      name: 'file',
      width: '100%',
      placeholder:'Some Description'
    }
  ]
  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'background-color', '#f4f4f9');
    this.api.addUrl(`course/${this.id}`);
    this.api.getAll().subscribe({
      next: (res) => {
        this.course = res.data?.[0]; // Access the first course safely
        if (this.course?.Course_Outline?.data) {
          this.pdfUrl = this.createPdfUrl(this.course.Course_Outline.data);
        }
      },
      error: (er) => {
        console.error('Error fetching course details:', er);
        this.router.navigateByUrl('/error'); // Redirect or handle error
      },
    });
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
      setTimeout(() => {
        URL.revokeObjectURL(this.pdfUrl!);
      }, 1000);
    } else {
      console.error('PDF URL is not available.');
    }
  }

  logincheck(login: boolean): void {
    this.logged = login;
  }
}
