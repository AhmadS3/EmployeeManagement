import { Component,ViewChild, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, NgForm } from '@angular/forms'
import { from } from 'rxjs';

import {EmployeeService} from '../service/employee.service'
import { Employee } from '../model/employee.model';
import { MatTableDataSource, MatSort , MatPaginator } from '@angular/material';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers:[EmployeeService]
})
export class EmployeeComponent implements OnInit {

  update:boolean=false;



  constructor(private employeeService:EmployeeService) { }
  
  

  displayedColumns: string[] = ['_id','index','name', 'designation', 'address', 'salary','actions'];
  
  dataSource:any;

  @ViewChild(MatSort,{static: false}) sort:MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator:MatPaginator;

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
    
  }

  resetForm(employeeForm?:NgForm):void{
    if(employeeForm)
    {
      employeeForm.reset();
    }
    this.employeeService.selectedEmployee={
      _id:'',
      name: '',
      designation: '',
      address: '',
      salary:null,
    };
  }
  onSubmit(employeeForm:NgForm):void{
    if(employeeForm.invalid){
      return;
    }
      else{
        if(employeeForm.value._id==""){
          this.employeeService.postEmployee(employeeForm.value).subscribe(res=>{
            this.resetForm(employeeForm);
            this.refreshEmployeeList();
            this.update=false;
          });
        }
        else{
          this.employeeService.putEmployee(employeeForm.value).subscribe(res=>{
            this.resetForm(employeeForm);
            this.refreshEmployeeList();
            this.update=false;
          });
        }
      }
    
    
    console.log(employeeForm.value);
  }
  
  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
      this.dataSource = new MatTableDataSource(this.employeeService.employees);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator
    });
  }
  onEdit(emp:Employee){
    this.update=true;
    this.employeeService.selectedEmployee=emp;
  }
  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
      });
    }
  }
  save(){
    this.update=false;
    this.employeeService.selectedEmployee={
      _id:'',
      name: '',
      designation: '',
      address: '',
      salary:null,
    };
  }
  applyFilter(filtervalue:string) {
    console.log(filtervalue);
    this.dataSource.filter = filtervalue.trim().toLowerCase();
  }
  edit(row:any){
    console.log(row);
  }
}
