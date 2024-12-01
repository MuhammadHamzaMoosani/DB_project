import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private current_url:string=''
  private id:number=-1
  constructor() { }
  setUrl(currentUrl:string)
  {
    this.current_url=currentUrl
  }
  getUrl()
  {
    return this.current_url
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
