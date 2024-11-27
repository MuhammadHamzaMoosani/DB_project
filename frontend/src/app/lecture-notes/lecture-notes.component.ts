import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataApiService } from '../data-api.service';

@Component({
  selector: 'app-lecture-notes',
  templateUrl: './lecture-notes.component.html',
  styleUrl: './lecture-notes.component.css'
})
export class LectureNotesComponent implements OnInit {
  course: any;
  id:number=-1
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
            console.log(this.course)
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
