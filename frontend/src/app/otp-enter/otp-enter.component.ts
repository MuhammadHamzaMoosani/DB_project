import { Component, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataApiService } from '../data-api.service';

@Component({
  selector: 'app-otp-enter',
  templateUrl: './otp-enter.component.html',
  styleUrl: './otp-enter.component.css'
})
export class OtpEnterComponent {
  constructor(private renderer: Renderer2,private api:DataApiService,private router:Router){}
  submit(form: NgForm) 
  {
    console.log(form.value)
    this.api.addUrl('users/otp')
    console.log(form.value)
    this.api.post(form.value).subscribe(response=>
      {
        console.log(response)
        // this.router.navigateByUrl('')
      })
  }
}
