import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../data-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-resource',
  templateUrl: './admin-resource.component.html',
  styleUrl: './admin-resource.component.css'
})
export class AdminResourceComponent implements OnInit{
  showAlert=false
  message:string=''
  success:boolean=false;
  error:boolean=false;
  materials:any
  selectedMaterials:boolean[]=[]
  selectAllChecked = false;
  constructor(private api:DataApiService,private router:Router){}
  toggleSelectAll(): void {
    this.selectAllChecked = !this.selectAllChecked;
    Object.keys(this.selectedMaterials).forEach(
      key => (this.selectedMaterials[+key] = this.selectAllChecked)
    );
  }
  ngOnInit(): void {
    this.api.addUrl('course/getUnapproved')
    this.api.getAll().subscribe(
      { next:res=>
        {
          this.materials=res.material          
          this.materials.forEach((_: any, index:number) => (this.selectedMaterials[index] = false));

        },
        error:er=>
          {
          // this.spinner=true

            this.message=er
            this.success=false
            this.error=true
            this.showAlert=true
            setTimeout(() => {
              this.showAlert=false
              // this.spinner=false
              
            }, 3000);
            
          }
      })
  }
  approve()
  {
    
    this.api.addUrl('course/setApprove')
    const trueIndices = this.selectedMaterials
    .map((isSelected: boolean, index: number) => (isSelected ? index : null))
    .filter((index): index is number => index !== null);
  console.log(trueIndices)
  for (const index of trueIndices) {
    this.api.post({id:this.materials[index].Material_ID,status:"Approved"}).subscribe(
      { next:res=>
        {
          
          this.showAlert=true
          this.error=false
          this.success=true
          this.message="Approved"
          setTimeout(() => {
  
            this.showAlert=false
            window.location.reload(); // Force page reload

          }, 1000);
        },
        error:er=>
          {
          // this.spinner=true

            this.message=er
            this.success=false
            this.error=true
            this.showAlert=true
            setTimeout(() => {
              this.showAlert=false
              // this.spinner=false
              
            }, 3000);
            
          }
      })
  }}
}
