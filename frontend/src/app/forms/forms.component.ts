import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormElement } from '../util/interface';

@Component({
  selector: 'archieve-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent implements OnInit {
@Input('formElement') form!:FormElement[]
same_line:FormElement[]=[]

submit(formData: NgForm) {
  console.log(formData)
}
ngOnInit(): void {
  // this.same_line=this.form.filter(element=>element.same_line)
}

}
