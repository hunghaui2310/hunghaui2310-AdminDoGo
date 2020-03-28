import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultComponent} from './default.component';
import {DashboardComponent} from '../../modules/dashboard/dashboard.component';
import {RouterModule} from '@angular/router';
import {ViewsModule} from '../../views/views.module';
import {MatCardModule, MatDividerModule, MatSidenavModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DashboardService} from '../../services/dashboard.service';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ViewsModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule
  ],
  providers: [
    DashboardService
  ]
})
export class DefaultModule { }
