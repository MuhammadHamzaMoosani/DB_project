import { Component, Input } from '@angular/core';
// import { TokenCookieService } from '../tokken-cookie.service';
// import { DataService } from '../data.service';
// import { HelperMethods2 } from '../util/helper';
// import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  @Input("activeIndex") activeIndex:number=-1
  login:boolean=false;
  constructor(
    // public data:DataService,
    // public helper:FormDataService
  )
  {
    
  }
  active(activeIndex:number)
  {
    this.activeIndex=activeIndex
    console.log(activeIndex)
  }
  logincheck(login: boolean) 
  {
    this.login=login 
    console.log(login)
  }
  signOut()
  {
    // this.data.addUrl('user/logout')
    // this.data.getAll().subscribe(res=>
    //   {
    //     console.log(res)
    //   })
  }
}
