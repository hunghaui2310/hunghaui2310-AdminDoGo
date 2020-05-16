import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/user';
import {appConfig} from '../config/app.config';
import {EmployeeModel} from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  service: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  service$: Observable<any> = this.service.asObservable();

  setService(service: any) {
    this.service.next(service);
  }

  getAllEmployee(): Observable<User[]> {
    return this.http.get<User[]>(appConfig.get_all_employee_API);
  }

  getManage(): Observable<User[]> {
    return this.http.get<User[]>(appConfig.get_manage_API);
  }

  insertEmployeeAPI(employee: User) {
    return this.http.post(appConfig.insert_employee_API, employee);
  }

  addEmployeeAPI(employee: EmployeeModel) {
    return this.http.post(appConfig.insert_employee_API, employee);
  }

  resetPasswordAPI(employee: User) {
    return this.http.post(appConfig.reset_password_API, employee);
  }

  deleteEmployeeAPI(employee: EmployeeModel) {
    return this.http.post(appConfig.delete_employee_API, employee);
  }

  searchEmployeeAPI(employee: EmployeeModel) {
    return this.http.post(appConfig.search_employee_API, employee);
  }
}
