import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee } from '../model/employee.model'

const httOption={
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee:Employee;
  employees: Employee[];
  constructor(private http:HttpClient) { }
  readonly baseURL:string="http://localhost:3000/employee";

  postEmployee(emp:Employee):Observable<Employee>{
    return this.http.post<Employee>(this.baseURL,emp,httOption);
  }
  getEmployeeList() {
    return this.http.get(this.baseURL);
  }
  putEmployee(emp:Employee){
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }
  deleteEmployee(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
