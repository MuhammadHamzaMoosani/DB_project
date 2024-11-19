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
  bookmark()
  {
    this.bookmarked=!this.bookmarked;
  }
  constructor(private api:DataApiService,private router:Router,private route: ActivatedRoute)
  {
   this.id= +route.snapshot.paramMap.get('id')!;
  }
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
}
