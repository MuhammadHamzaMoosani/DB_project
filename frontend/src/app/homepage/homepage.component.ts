import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../data-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{
  courses: any[] = [];
  constructor(private api:DataApiService,private route:Router)
  {

  }
  ngOnInit(): void 
  {
    this.api.addUrl('course/landing')
    this.api.getAll().subscribe(
      {
        next:res=>
          {
            console.log(res)
            this.courses=res.Courses
            console.log(this.courses)
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
  navigate(i:number)
  {
    this.route.navigateByUrl(`course/${this.courses[i].Course_name}/${this.courses[i].Course_ID}`)
  }

}
