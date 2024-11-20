import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../data-api.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Course } from '../util/interface';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  searchIndex:number=-1
  courses!: Course[] ; // Use the Course interface
  myControl = new FormControl<string | Course>(''); // Adjust typing for the control

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
    this.route.navigateByUrl(`course/${this.courses[i].Course_name}/${this.courses[i].Course_ID}`);
  }
  search(): void {
    this.route.navigateByUrl(`course/${this.courses[this.searchIndex].Course_name}/${this.courses[this.searchIndex].Course_ID}`);
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
