import { Component, Input } from '@angular/core';
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
  myControl = new FormControl<string | Course>(''); // Adjust typing for the control
  @Input('title') title!:string
  @Input('apiUrl') apiUrl!:string
  searchString:boolean=false
  selectedCourseName: string = '';

  // Filtered options observable
  filteredOptions!: Observable<Course[]>;

  constructor(private api: DataApiService, private route: Router) 
  {
    console.log(this.searchString)
  }
  ngOnInit(): void {
    // Fetch courses from API
    this.api.addUrl(this.apiUrl);
    this.api.getAll().subscribe({
      next: (res) => {
        console.log(res);
        this.courses = res.Courses;
        console.log(this.courses);

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
    this.searchString=true
    this.api.post({"courseName":this.selectedCourseName}).subscribe({
      next: (res) => {
        console.log(res);
        this.courses = res.Courses;
        console.log(this.courses);

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
  displayFn(course: Course): string {
    return course ? course.Course_name : '';
  }
  onOptionSelected(event: any) {
    this.selectedCourseName = event.option.value.Course_name;
    console.log(this.selectedCourseName)
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
