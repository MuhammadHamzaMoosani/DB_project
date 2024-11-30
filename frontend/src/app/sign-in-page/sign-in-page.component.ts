import { Component, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataApiService } from '../data-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css'
})
export class SignInPageComponent {
  hide:boolean=true
  spinner:boolean=true

  showAlert=false
  message:string=''
  success:boolean=false;
  error:boolean=false;
  constructor(private renderer: Renderer2,private api:DataApiService,private router:Router){}
  ngOnInit(): void {
    const appRoot = document.querySelector('app-root'); // Select the app-root element
    if (appRoot) {
      this.renderer.setStyle(appRoot, 'height', 'inherit'); // Apply the style
    }
  }
  submit(form: NgForm) 
  {
    console.log(form.value)
    this.api.addUrl('users/login')
    this.api.post(form.value).subscribe(
      { next:res=>
        {
          this.showAlert=true
          this.spinner=true
          this.error=false
          this.success=true
          this.message=res.message
          setTimeout(() => {
  
            this.showAlert=false
            this.spinner=false

            this.router.navigateByUrl('otp')
          }, 1000);
        },
        error:er=>
          {
            this.message=er
            this.success=false
            this.error=true
            this.showAlert=true
            setTimeout(() => {
              this.showAlert=false
            }, 3000);
            
          }
      })
  }
}
