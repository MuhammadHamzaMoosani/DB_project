import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataApiService } from '../data-api.service';
import { HelperService } from '../helper.service';
import { CookieTokkenService } from '../cookie-tokken.service';

@Component({
  selector: 'app-otp-enter',
  templateUrl: './otp-enter.component.html',
  styleUrl: './otp-enter.component.css'
})
export class OtpEnterComponent implements OnInit{
  showAlert=false
  message:string=''
  success:boolean=false;
  error:boolean=false;
  status:string=''
  constructor(private renderer: Renderer2,
    private api:DataApiService,
    private router:Router,
    private helper:HelperService,
    private tokken:CookieTokkenService,
    private route:ActivatedRoute
  ){}
  ngOnInit(): void {
   this.status= this.route.snapshot.paramMap.get('status')!;
    const appRoot = document.querySelector('app-root'); // Select the app-root element
    if (appRoot) {
      this.renderer.setStyle(appRoot, 'height', 'inherit'); // Apply the style
    }
    // this.api.addUrl('users/checkOtpExit')
    // this.api.post().subscribe(
    //   { next:res=>
    //     {
    //       this.showAlert=true
    //       this.error=false
    //       this.success=true
    //       this.message=res.message
    //       setTimeout(() => {
  
    //         this.showAlert=false
    //         this.helper.setId(res.user[0].User_ID)
    //         console.log(res.user)
    //         this.router.navigateByUrl('otp')
    //       }, 1000);
    //     },
    //     error:er=>
    //       {

    //         this.message=er
    //         this.success=false
    //         this.error=true
    //         this.showAlert=true
    //         setTimeout(() => {
    //           this.showAlert=false
              
    //         }, 3000);
            
    //       }
    //   })
  
    if(this.helper.getId()==-1 && this.status=='login')
      {
          this.showAlert=true
          this.error=true
          this.message="Need to login First"
          setTimeout(() => {
            this.showAlert=false
            this.router.navigateByUrl('SignIn')
          }, 1000);
      }
      if(this.helper.getEmail()=="" && this.status=='signUp')
        {
            this.showAlert=true
            this.error=true
            this.message="SignUp connection lost"
            setTimeout(() => {
              this.showAlert=false
              this.router.navigateByUrl('SignUp')
            }, 1000);
        }
  }
  submit(form: NgForm) 
  {
    if(this.status=='signUp')
      {
        let apiObject={'otp':form.value.otp,'email':this.helper.getEmail()}
        this.api.addUrl('users/signUp/otp')
        this.api.post(apiObject).subscribe(
          { next:res=>
            {
              this.showAlert=true
              this.error=false
              this.success=true
              this.message=res.message
              console.log(res.jwt)
              this.tokken.setToken(res.jwt);
              setTimeout(() => {
      
                this.showAlert=false
                this.router.navigateByUrl('/').then(() => {
                  window.location.reload(); // Force page reload
                });          
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
    else
    {

      console.log(this.helper.getId())
      let apiObject={'otp':form.value.otp,'id':this.helper.getId()}
      this.api.addUrl('users/otp')
      this.api.post(apiObject).subscribe(
        { next:res=>
          {
            this.showAlert=true
            this.error=false
            this.success=true
            this.message=res.message
            console.log(res.jwt)
            this.tokken.setToken(res.jwt);
            setTimeout(() => {
    
              this.showAlert=false
              this.router.navigateByUrl('/').then(() => {
                window.location.reload(); // Force page reload
              });          
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
}
