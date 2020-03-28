import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DefaultModule} from './layouts/default/default.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {ApiService} from './services/api.service';
import {MAT_DATE_LOCALE} from '@angular/material';
import {ApiresponInterceptor} from './interceptor/apirespon.interceptor';
import {TokenInterceptor} from './interceptor/token.interceptor';
import {ExcelService} from './services/excel.service';
import {AuthGuard} from './interceptor/auth.guard';
import {OauthService} from './services/oauth.service';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    ChartsModule,
    HttpClientModule,
    ToastrModule.forRoot({timeOut: 2000, progressBar: false, positionClass: 'toast-top-center'}),
  ],
  providers: [
    ApiService, OauthService, AuthGuard, ExcelService,
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VI'},
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiresponInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
