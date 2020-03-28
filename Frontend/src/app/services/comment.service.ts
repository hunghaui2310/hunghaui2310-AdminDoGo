import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommnentModel} from '../model/commnent.model';
import {Observable} from 'rxjs';
import {appConfig} from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getSomeNotifiAPI(): Observable<CommnentModel[]> {
    return this.http.get<CommnentModel[]>(appConfig.get_some_notification_admin_API);
    console.log('da goi API');
  }
}
