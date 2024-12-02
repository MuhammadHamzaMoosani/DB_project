import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fetch-by-program',
  templateUrl: './fetch-by-program.component.html',
  styleUrl: './fetch-by-program.component.css'
})
export class FetchByProgramComponent {
  url:string=''
  program:string=''
  constructor(private router:Router,private route: ActivatedRoute)
  {
    this.program=route.snapshot.paramMap.get('program')!
    this.url="course/program/"+this.program;

  }

}
