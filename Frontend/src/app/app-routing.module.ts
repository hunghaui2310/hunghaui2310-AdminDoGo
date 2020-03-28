import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DefaultComponent} from './layouts/default/default.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {LoginComponent} from './views/account/login/login.component';
import {ProfileComponent} from './views/account/profile/profile.component';
import {ForgotPasswordComponent} from './views/account/forgot-password/forgot-password.component';
import {RegisterComponent} from './views/account/register/register.component';
import {ProductComponent} from './views/management/product/product.component';
import {BlogComponent} from './views/management/blog/blog.component';
import {EmployeeComponent} from './views/management/employee/employee.component';
import {CategoryComponent} from './views/management/category/category.component';
import {ChartComponent} from './views/charts/chart/chart.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
      path: '',
      component: DashboardComponent
      },
      {
        path: 'charts',
        component: ChartComponent
      },
      {
        path: 'product',
        component: ProductComponent,
        data: { title: 'Quản lý sản phẩm'}
      },
      {
        path: 'category',
        component: CategoryComponent,
        data: { title: 'Quản lý thể loại'}
      },
      {
        path: 'blog',
        component: BlogComponent,
        data: { title: 'Quản lý bài viết'}
      },
      {
        path: 'employee',
        component: EmployeeComponent,
        data: { title: 'Quản lý nhân viên'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
