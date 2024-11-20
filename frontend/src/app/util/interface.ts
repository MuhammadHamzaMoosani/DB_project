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
export interface Course {
  Course_ID: number;
  Course_Code: string;
  Course_name: string;
  Course_type: 'Under-Graduate' | 'Graduate' | 'Post_Graduate'; // Assuming ENUM values
  Program: string; // Could also be a union type like 'BSCS' | 'BSECO' | ...
  School: string; // Could also be a union type if schools are predefined
  Semester_Year: string;
  Course_description: string;
  Course_Outline: {
    type: string; // e.g., 'Buffer'
    data: number[]; // Binary data as an array
  };
  Course_Status: 'Active' | 'Archived'; // Assuming ENUM values
  Course_image: string; // URL to the image
  Topics: string[]; // List of topics
  Views: number;
  Bookmarks: number;
  Downloads: number;
  Popularity_Score: number;
}
  
  