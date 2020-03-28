import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/user';
import {appConfig} from '../config/app.config';

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

  resetPasswordAPI(employee: User) {
    return this.http.post(appConfig.reset_password_API, employee);
  }
}
