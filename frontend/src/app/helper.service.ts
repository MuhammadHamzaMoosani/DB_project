import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private current_url:string=''
  constructor() { }
  setUrl(currentUrl:string)
  {
    this.current_url=currentUrl
  }
  getUrl()
  {
    return this.current_url
  }
}
