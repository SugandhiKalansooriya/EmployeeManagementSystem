import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})



export class EditEmployeeComponent implements OnInit{

  employeeDetails:Employee={
    id:'',
    name:'',
    email:'',
    phone:0,
    salary:0,
    department:''
  }

  constructor(private route:ActivatedRoute,private employeeServise:EmployeesService,private router:Router){

  }
  
  ngOnInit(): void {
 
   this.route.paramMap.subscribe({
    next:(params)=>{
      const id =params.get('id')

      if(id){
        this.employeeServise.getEmployee(id).subscribe({
          next:(response)=>{
            this.employeeDetails=response;
          }
        })

      }
    }
   })
  }
  
  updateEmployee(){
    this.employeeServise.updateEmploye(this.employeeDetails.id,this.employeeDetails)
    .subscribe({
      next:(response)=>{
        this.router.navigate(['/'])

      }
    })
  }

  deleteEmployee(id:string){
    this.employeeServise.deleteEmploye(id)
    .subscribe({
      next:(response)=>{
        this.router.navigate(['/']);

      }
    })
  }

}
