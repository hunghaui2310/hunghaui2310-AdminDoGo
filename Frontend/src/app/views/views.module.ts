import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyHeaderComponent} from './my-header/my-header.component';
import {MyFooterComponent} from './my-footer/my-footer.component';
import {MySidebarComponent} from './my-sidebar/my-sidebar.component';
import {
  MatButtonModule, MatDatepickerModule, MatDialogModule,
  MatDividerModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatMenuModule, MatNativeDateModule,
  MatPaginatorModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import { AreaChartComponent } from './charts/area-chart/area-chart.component';
import {HighchartsChartModule} from 'highcharts-angular';
import { CardComponent } from './card/card.component';
import {LoginComponent} from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { ProfileComponent } from './account/profile/profile.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductComponent } from './management/product/product.component';
import { DialogProductComponent } from './management/product/dialog-product/dialog-product.component';
import { BlogComponent } from './management/blog/blog.component';
import { EmployeeComponent } from './management/employee/employee.component';
import { CategoryComponent } from './management/category/category.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {ModalModule} from 'ngx-bootstrap';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { DatePickerComponent } from './charts/date-picker/date-picker.component';
import { ChartComponent } from './charts/chart/chart.component';
import { DountChartComponent } from './charts/dount-chart/dount-chart.component';
import {ChartsModule} from 'ng2-charts';
import { DialogEmployeeComponent } from './management/employee/dialog-employee/dialog-employee.component';

@NgModule({
  declarations: [
    MyHeaderComponent,
    MyFooterComponent,
    MySidebarComponent,
    AreaChartComponent,
    CardComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    ProductComponent,
    DialogProductComponent,
    BlogComponent,
    EmployeeComponent,
    CategoryComponent,
    PieChartComponent,
    BarChartComponent,
    LineChartComponent,
    DatePickerComponent,
    ChartComponent,
    DountChartComponent,
    DialogEmployeeComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatDialogModule,
    ModalModule.forRoot(),
    ChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  exports: [
    MyHeaderComponent,
    MyFooterComponent,
    MySidebarComponent,
    AreaChartComponent,
    CardComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    ProductComponent,
    DialogProductComponent,
    BlogComponent,
    EmployeeComponent,
    CategoryComponent,
    PieChartComponent,
    BarChartComponent,
    LineChartComponent,
    DatePickerComponent
  ],
  entryComponents: [DialogProductComponent, DialogEmployeeComponent]
})
export class ViewsModule { }
