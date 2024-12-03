import { Component, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataApiService } from '../data-api.service';
import { HelperService } from '../helper.service';
import { CookieTokkenService } from '../cookie-tokken.service';

@Component({
  selector: 'app-admin-sign-in',
  templateUrl: './admin-sign-in.component.html',
  styleUrl: './admin-sign-in.component.css'
})
export class AdminSignInComponent {
  hide:boolean=true
  spinner:boolean=false

  showAlert=false
  message:string=''
  success:boolean=false;
  error:boolean=false;
  constructor(private renderer: Renderer2
    ,private api:DataApiService
    ,private router:Router
    ,private helper:HelperService,
    private tokken:CookieTokkenService){}
  ngOnInit(): void {
    const appRoot = document.querySelector('app-root'); // Select the app-root element
    if (appRoot) {
      this.renderer.setStyle(appRoot, 'height', 'inherit'); // Apply the style
    }
  }
  submit(form: NgForm) 
  {
    console.log(form.value)
    this.api.addUrl('admin/login')
    this.api.post(form.value).subscribe(
      { next:res=>
        {
          this.showAlert=true
          this.spinner=true
          this.error=false
          this.success=true
          this.message=res.message
          this.tokken.setToken(res.jwt);
          setTimeout(() => {
  
            this.showAlert=false
            this.spinner=false
            this.helper.setId(res.User_Id)
            console.log(res.user)
            this.router.navigateByUrl('fffeefefe/admin/homepage').then(()=>
              {
                window.location.reload();
              })
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
