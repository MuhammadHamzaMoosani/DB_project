import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {
  courseName:string=''
  constructor(private route:ActivatedRoute)
  {
    this.courseName= route.snapshot.paramMap.get('courseName')!;
  }
}
