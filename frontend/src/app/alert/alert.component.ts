import { Component, Input } from '@angular/core';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() showAlert=false
  @Input() message:string=''
  @Input() success:boolean=false;
  @Input() error:boolean=false;
  @Input() loginALert:boolean=false;

}
