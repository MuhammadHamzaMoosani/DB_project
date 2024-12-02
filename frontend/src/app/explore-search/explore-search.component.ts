import { Component, Input, Renderer2 } from '@angular/core';
import { Course } from '../util/interface';
import { Router } from '@angular/router';
import { DataApiService } from '../data-api.service';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'explore-search',
  templateUrl: './explore-search.component.html',
  styleUrl: './explore-search.component.css'
})
export class ExploreSearchComponent {
  courses!: Course[] ; // Use the Course interface
  searchIndex:number=-1
  myControl = new FormControl<string | Course>('');
  @Input('title') title!:string
  @Input('apiUrl') apiUrl!:string
  @Input('searchString') searchString:boolean=false
  selectedCourseName: string = '';
  @Input('searchCourse') searchCourse:string=''
  // Filtered options observable
  filteredOptions!: Observable<Course[]>;

  constructor(private api: DataApiService, private route: Router,private renderer:Renderer2) 
  {
    console.log(this.searchString)
  }
  ngOnInit(): void {
    console.log(this.searchString)
    // Fetch courses from API
    if(!this.searchString)
      {
        this.api.addUrl(this.apiUrl);
        this.api.getAll().subscribe({
          next: (res) => {
            console.log(res);
            this.courses = res.Courses;
            console.log(this.courses);
            if(this.courses.length==0)
              {
                const appRoot = document.querySelector('app-root'); // Select the app-root element
    
                if (appRoot) {
                  this.renderer.setStyle(appRoot, 'height', 'inherit'); // Apply the style
                }
              }
            // Initialize filtered options
            this.filteredOptions = this.myControl.valueChanges.pipe(
              startWith(''),
              map((value) => (typeof value === 'string' ? value : value?.Course_name || '')),
              map((name) => (name.trim() ? this.filterCourses(name) : []))
              // map((name) => this.filterCourses(name))
            );
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
      else
      {
        console.log('here')
        this.search()
      }
  }

  // Filter courses based on the entered name
  filterCourses(name: string): Course[] {
    const filterValue = name.toLowerCase();
    return this.courses.filter((course) =>
      course.Course_name.toLowerCase().includes(filterValue)
    );
  }

  // Navigate to the course details page
  navigate(i: number): void {
    this.route.navigateByUrl(`course/${this.courses[i].Course_name}/${this.courses[i].Course_ID}`);
  }
  search(): void {
    this.api.addUrl('course/find');
    console.log(this.searchCourse)
    console.log("in api"+this.searchCourse)
    this.api.post({"courseName":this.searchCourse}).subscribe({
      next: (res) => {
        console.log(res);
        this.courses = res.Courses;
        console.log(this.courses);
        this.searchString=true
        // Initialize filtered options
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map((value) => (typeof value === 'string' ? value : value?.Course_name || '')),
          map((name) => (name.trim() ? this.filterCourses(name) : []))
          // map((name) => this.filterCourses(name))
        );
      },
      error: (err) => {
        console.error(err);
      }
    });
    // this.route.navigateByUrl(`course/${this.courses[this.searchIndex].Course_name}/${this.courses[this.searchIndex].Course_ID}`);
  }

  // Display function for mat-autocomplete
  displayFn(course: Course | null): string {
    return course ? course.Course_name : '';
  }
  
  onOptionSelected(event: any) {
    this.selectedCourseName = event.option.value;
    console.log(this.selectedCourseName)  
    this.myControl.setValue(this.selectedCourseName);
    this.searchCourse = event.option.value.Course_name;
  }

  // onOptionSelected(event: any): void {
  //   const selectedCourse: Course = event.option.value;
  
  //   // Retrieve the index of the selected course
  //   const index = this.courses.findIndex(course => course.Course_ID === selectedCourse.Course_ID);
  //   this.searchIndex=index
  //   // console.log('Selected Course:', selectedCourse);
  //   // console.log('Selected Index:', index);
  
  //   // You can now use this index as needed
  // }
}
