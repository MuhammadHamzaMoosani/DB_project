import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private current_url:string=''
  private id:number=-1
  private email:string=''
  constructor() { }
  setUrl(currentUrl:string)
  {
    this.current_url=currentUrl
  }
  getUrl()
  {
    return this.current_url
  }
  setEmail(email:string)
  {
    this.email=email
  }
  getEmail()
  {
    return this.email
  }
  setId(id:number)
  {
      this.id=id
  }
  getId()
  {
    return this.id
  }
}
