import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataApiService } from '../data-api.service';

@Component({
  selector: 'login-checker',
  templateUrl: './login-checker.component.html',
  styleUrl: './login-checker.component.css'
})
export class LoginCheckerComponent {
  login=false
  showAlert=false
  // user!:User
  @Input('style') class!:string
  @Input('nav_bar') nav_bar:boolean=false;
  @Output() userLoggedIn = new EventEmitter<boolean>();
  @Output('admin') Admin = new EventEmitter<boolean>();
  // @Output() loggedDetails = new EventEmitter<User>();
  constructor(public data:DataApiService,
    public router:Router,
  )
  {
  }
  ngOnInit(): void 
  {
    this.data.addUrl('users/loginCheck')
    this.data.getAll().subscribe
    (

      {
      next:res=>
        {
          console.log(res)
          this.login=true
          this.userLoggedIn.emit(true)
          // this.loggedDetails.emit(res)
        },
      error:er=>
        {
          // console.error = function() {};
          this.showAlert=true
          this.userLoggedIn.emit(false)
          if(this.nav_bar)
            {
              return
            }
          setTimeout(() => {
            this.showAlert=false
            this.router.navigateByUrl('login')
          }, 1000);
          
        }
      }
    )
    this.data.addUrl('admin/userType')
    this.data.getAll().subscribe
    (

      {
      next:res=>
        {
          console.log(res)
          this.Admin.emit(true)
          // this.loggedDetails.emit(res)
        },
      error:er=>
        {
          // console.error = function() {};
          this.showAlert=true
          this.Admin.emit(false)
          if(this.nav_bar)
            {
              return
            }
          setTimeout(() => {
            this.showAlert=false
            this.router.navigateByUrl('login')
          }, 1000);
          
        }
      }
    )
  }

}
