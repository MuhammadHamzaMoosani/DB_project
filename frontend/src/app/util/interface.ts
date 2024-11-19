type tags='input'|'select'|'checkbox' |'location'
type input_types='text'|'password'|'email'|'number'|'date'|'file'|'radio'|'submit'|'reset'|'button'|'hidden'
export interface FormElement{
    label:string
    type:tags
    input_type?:input_types
    options?:any[]
    name:string
    id?:string
    value?:string
    placeholder?:string
    space?:boolean
  }