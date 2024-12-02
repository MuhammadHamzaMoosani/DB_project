import { Component, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataApiService } from '../data-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  hide:boolean=true
  hide2:boolean=true
  spinner:boolean=false

  showAlert=false
  message:string=''
  success:boolean=false;
  error:boolean=false;
  constructor(private renderer: Renderer2,private router:Router,private api:DataApiService){}
  ngOnInit(): void {
    const appRoot = document.querySelector('app-root'); // Select the app-root element
    if (appRoot) {
      this.renderer.setStyle(appRoot, 'height', 'inherit'); // Apply the style
    }
  }
  submit(form: NgForm) 
  {
    this.api.addUrl('users/signUp')
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
            console.log(res.user)
            this.router.navigateByUrl('')
          }, 1000);
        },
        error:er=>
          {
          this.spinner=true

            this.message=er
            this.success=false
            this.error=true
            this.showAlert=true
            setTimeout(() => {
              this.showAlert=false
              this.spinner=false
              
            }, 3000);
            
          }
      })
  }
}
