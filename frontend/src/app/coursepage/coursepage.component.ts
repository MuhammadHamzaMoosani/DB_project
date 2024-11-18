import { Component } from '@angular/core';

@Component({
  selector: 'app-coursepage',
  templateUrl: './coursepage.component.html',
  styleUrl: './coursepage.component.css'
})
export class CoursepageComponent {
  bookmarked:boolean=false
  show:boolean=false
  bookmark()
  {
    this.bookmarked=!this.bookmarked;
  }
}
