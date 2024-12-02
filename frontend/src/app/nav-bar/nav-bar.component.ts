import { HelperService } from './../helper.service';
import { AfterViewInit, Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DataApiService } from '../data-api.service';
import { CookieTokkenService } from '../cookie-tokken.service';
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

  login:boolean=false;
  currentUrl: string = '';
  constructor(
    private router:Router,
    private helper:HelperService,
    private data:DataApiService,
    private tokken:CookieTokkenService
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
        this.helper.setUrl(this.currentUrl)
      }
    });
  }

  
  logincheck(login: boolean) 
  {
    this.login=login 
    console.log(login)
  }
  signOut()
  {
    console.log('here')
    this.data.addUrl('users/logOut')
    this.data.getAll().subscribe(res=>
      {
        this.tokken.deleteToken();
        console.log(res)  
        this.router.navigateByUrl('/').then(() => {
          window.location.reload(); // Force page reload
        });
        
      })
  }
}
