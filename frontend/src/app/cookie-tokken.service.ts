import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieTokkenService {

  constructor(public cookie:CookieService) { }
  setToken(tokken:any)
  {
    tokken = {jwt: tokken};
    this.cookie.set('user', JSON.stringify(tokken),
      {
        secure: true,
        path: '/',
        sameSite: 'None'
      })
  }
  
  getToken()
  {
    let userCookie=this.cookie.get('user')
    if (userCookie) {
      const tokenData = JSON.parse(userCookie);
      const jwt = tokenData.jwt; // This extracts the JWT
      return jwt ;
    } else {
      console.log("User cookie not found");
    }
  }
  deleteToken()
  {
    this.cookie.delete('user','/')
  }
}
