import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormElement } from '../util/interface';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent implements OnInit{
  constructor(private renderer: Renderer2){}
  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'background-color', '#f4f4f9');
  }
  formElement:FormElement[]=[
    
    {
      label: 'Course Title',
      type: 'input',
      input_type: 'text',
      name: 'Course_name',
      width: '56%',
      placeholder:'Enter Course title'
    },
    {
      label: 'Course Code',
      type: 'input',
      input_type: 'text',
      name: 'Course_Code',
      width: '20%',
      placeholder:'Course Code'
    },
    {
      label: 'Semester/Year',
      type: 'input',
      input_type: 'text',
      name: 'Semester_Year',
      width: '20%',
      placeholder:'semester/year'
    },
    {
      label: 'Course Type',
      type: 'select',
      name: 'Course_type',
      options: ['Under-Graduate', 'Graduate', 'Post_Graduate'],
      width: '56%'
    },
    {
      label: 'Course Department',
      type: 'select',
      options: ['BSCS', 'BBA', 'BSSS', 'BSECO', 'BSAF', 'BSEM', 'BSMath'],
      name: 'Program',
      width: '20%'
    },
    
    {
      label: 'Status ',
      type: 'select',
      options: ['Active', 'Archieved'],
      name: 'Program',
      width: '20%'
    },
   
    {
      label: 'Description',
      type: 'textarea',
      name: 'Course_description',
      width: '100%',
      placeholder:'Some Description'
    },
   
  ]
}
