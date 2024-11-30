import { Component, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataApiService } from '../data-api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  hide:boolean=true

  constructor(private renderer: Renderer2,private api:DataApiService){}
  ngOnInit(): void {
    const appRoot = document.querySelector('app-root'); // Select the app-root element
    if (appRoot) {
      this.renderer.setStyle(appRoot, 'height', 'inherit'); // Apply the style
    }
  }
  submit(form: NgForm) 
  {
    console.log(form.value)
  }
}
