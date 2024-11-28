import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataApiService } from '../data-api.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css'
})
export class ExamComponent {
course: any;
id:number=-1
  constructor(private api:DataApiService,private router:Router,private route: ActivatedRoute)
  {
   this.id= +route.snapshot.paramMap.get('id')!;
  }
}
