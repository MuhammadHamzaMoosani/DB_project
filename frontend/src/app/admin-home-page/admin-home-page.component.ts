import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, startWith, map } from 'rxjs';
import { DataApiService } from '../data-api.service';
import { Course } from '../util/interface';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrl: './admin-home-page.component.css'
})
export class AdminHomePageComponent {

  searchIndex:number=-1
  courses!: Course[] ; // Use the Course interface
  myControl = new FormControl<string | Course>(''); // Adjust typing for the control
  searchText:string=''
  // Filtered options observable
  filteredOptions!: Observable<Course[]>;

  constructor(private api: DataApiService, private route: Router) {}

  ngOnInit(): void {
    // Fetch courses from API
    this.api.addUrl('course/landing');
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
    this.route.navigateByUrl(`fffeefefe/admin/${this.courses[i].Course_name}/${this.courses[i].Course_ID}`);
  }
  delete(i:number)
  {
    this.api.addUrl('course/delete');
    this.api.post({id:this.courses[i].Course_ID}).subscribe({
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
  search(): void {
    // if(this.searchIndex!=-1)
    //   {
    //     this.route.navigateByUrl(`course/${this.courses[this.searchIndex].Course_name}/${this.courses[this.searchIndex].Course_ID}`);
    //   }
    // else
    {
      this.route.navigateByUrl(`result/${this.searchText}`);

    }
  }

  // Display function for mat-autocomplete
  displayFn(course: Course): string {
    return course ? course.Course_name : '';
  }
  onOptionSelected(event: any): void {
    const selectedCourse: Course = event.option.value;
  
    // Retrieve the index of the selected course
    const index = this.courses.findIndex(course => course.Course_ID === selectedCourse.Course_ID);
    this.searchIndex=index
    // console.log('Selected Course:', selectedCourse);
    // console.log('Selected Index:', index);
  
    // You can now use this index as needed
  }
}
