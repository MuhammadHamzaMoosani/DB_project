import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormElement } from '../util/interface';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {
@Input('formElement') form!:FormElement[]

submit(_t5: NgForm) {
throw new Error('Method not implemented.');
}

}
