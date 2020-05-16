import {Component, OnInit, TemplateRef} from '@angular/core';
import {ProductModel} from '../../../model/product.model';
import {CategoryModel} from '../../../model/category.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {EmployeeModel} from '../../../model/employee.model';
import {EmployeeService} from '../../../services/employee.service';
import {DialogProductComponent} from '../product/dialog-product/dialog-product.component';
import {MatDialog} from '@angular/material';
import {ExcelService} from '../../../services/excel.service';
import {ToastrService} from 'ngx-toastr';
import {DialogEmployeeComponent} from './dialog-employee/dialog-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  listEmployee: EmployeeModel[];
  currentP = 1;
  pageSize = 15;
  formEmployee: FormGroup;
  private modalRef: BsModalRef;
  dataCreate;
  employeeId: number;

  constructor(private employeeService: EmployeeService,
              private formBuilder: FormBuilder,
              private excelService: ExcelService,
              private modalService: BsModalService,
              private toastr: ToastrService,
              public dialog: MatDialog) {
    this.getAllEmployee();
    this.createForm();
  }

  ngOnInit() {
  }

  getAllEmployee() {
    this.employeeService.getAllEmployee().subscribe(
      res => {
        this.listEmployee = res['data'];
      }
    );
  }

  pageChange(event: number) {
    this.currentP = event;
  }

  createForm() {
    this.formEmployee = this.formBuilder.group({
      employeeCode: [''],
      email: [''],
      firstName: [''],
      lastName: [''],
      gender: [''],
      phoneNumber: [''],
      address: [''],
      birth: [''],
      manageCode: [''],
      salary: [''],
      createDate: ['']
    });
  }

  onBack() {
    this.modalRef.hide();
  }

  search() {
    this.currentP = 1;
    const code = this.formEmployee.controls['employeeCode'].value === '' ? null :
      this.formEmployee.controls['employeeCode'].value;
    const email = this.formEmployee.controls['email'].value === '' ? null :
      this.formEmployee.controls['email'].value;
    const gender = this.formEmployee.controls['gender'].value === '' ? null :
      this.formEmployee.controls['gender'].value;
    const firstName = this.formEmployee.controls['firstName'].value === '' ? null :
      this.formEmployee.controls['firstName'].value;
    const lastName = this.formEmployee.controls['lastName'].value === '' ? null :
      this.formEmployee.controls['lastName'].value;
    const phoneNumber = this.formEmployee.controls['phoneNumber'].value === '' ? null :
      this.formEmployee.controls['phoneNumber'].value;
    const address = this.formEmployee.controls['address'].value === '' ? null :
      this.formEmployee.controls['address'].value;
    const birth = this.formEmployee.controls['birth'].value === '' ? null :
      this.formEmployee.controls['birth'].value;
    const manageCode = this.formEmployee.controls['manageCode'].value === '' ? null :
      this.formEmployee.controls['manageCode'].value;
    const salary = this.formEmployee.controls['salary'].value === '' ? null :
      this.formEmployee.controls['salary'].value;
    const createDate = this.formEmployee.controls['createDate'].value === '' ? null :
      this.formEmployee.controls['createDate'].value;

    // tslint:disable-next-line:max-line-length
    const model = new EmployeeModel(null, code, email, null, firstName, lastName, phoneNumber, address, manageCode, salary, createDate, null, gender, birth);
    console.log('data search employee', model);

    this.employeeService.searchEmployeeAPI(model).subscribe(
      res => {
        this.listEmployee = res['data'];
      }
    );
  }

  showModalAdd() {
    const dialogRef = this.dialog.open(DialogEmployeeComponent, {
      maxWidth: '85vw',
      maxHeight: '95vh',
      width: '80vw',
      data: {
        dataCreate: this.dataCreate
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.search();
    });
  }

  removeEmployee() {
    const employeeModel = new EmployeeModel(this.employeeId, null, null, null, null, null, null, null, null, null, null, null, null, null);
    console.log('employee id to delete', employeeModel);
    this.employeeService.deleteEmployeeAPI(employeeModel).subscribe(
      res => {
        if (res['code'] === 200) {
          if (res['data'] === 'SUCCESS') {
            this.success('Xóa thành công');
          } else {
            this.error('Xóa thất bại');
          }
          this.getAllEmployee();
        } else {
          this.error('Đã xảy ra lỗi');
        }
        this.onBack();
      }
    );
  }

  openConfirm(pobjTemplate: TemplateRef<any>, id: number) {
    this.employeeId = id;
    this.modalRef = this.modalService.show(pobjTemplate, {
        ignoreBackdropClick: true
      }
    );
  }

  download(row: EmployeeModel[]): void {
    console.log('dataToDownload', row);
    this.excelService.downloadExcel(row, 'test');
  }

  success(message: string) {
    this.toastr.success(message, '');
  }

  error(message: string) {
    this.toastr.error(message, 'Lỗi');
  }
}
