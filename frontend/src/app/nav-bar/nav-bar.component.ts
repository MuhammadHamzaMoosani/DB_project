import { AfterViewInit, Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// import { TokenCookieService } from '../tokken-cookie.service';
// import { DataService } from '../data.service';
// import { HelperMethods2 } from '../util/helper';
// import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements AfterViewInit {

  @Input("activeIndex") activeIndex:number=-1
  login:boolean=false;
  currentUrl: string = '';
  constructor(
    private router:Router
    // public data:DataService,
    // public helper:FormDataService
  )
  {
    
  }
  ngAfterViewInit(): void {
    // Get the current URL
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        console.log(this.currentUrl); // This will now give the correct route URL
      }
    });
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
