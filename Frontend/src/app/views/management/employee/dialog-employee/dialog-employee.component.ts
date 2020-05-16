import {Component, Inject, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../model/user';
import {ToastrService} from 'ngx-toastr';
import {EmployeeService} from '../../../../services/employee.service';
import {EmployeeModel} from '../../../../model/employee.model';

@Component({
  selector: 'app-dialog-employee',
  templateUrl: './dialog-employee.component.html',
  styleUrls: ['./dialog-employee.component.scss']
})
export class DialogEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  listManage: EmployeeModel[];
  private modalRef: BsModalRef;
  isPreSpace: boolean;

  validation_messages = {
    'employeeCode': [
      {type: 'required', message: 'Mã nhân viên không được để trống'}
    ],
    'email': [
      {type: 'required', message: 'Email không được để trống'}
    ],
    'gender': [
      {type: 'required', message: 'Giá sản phẩm không được để trống'}
    ],
    'lastName': [
      {type: 'required', message: 'Mô tả không được để trống'}
    ],
    'firstName': [
      {type: 'required', message: 'Chưa chọn File'}
    ],
    'phoneNumber': [
      {type: 'required', message: 'Chưa chọn File'}
    ],
    'manageCode': [
      {type: 'required', message: 'Chưa chọn File'}
    ],
    'salary': [
      {type: 'required', message: 'Chưa chọn File'}
    ]
  };

  constructor(private modalService: BsModalService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DialogEmployeeComponent>,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private employeeService: EmployeeService) {
    this.createForm();
    this.getManageCode();
  }

  ngOnInit() {
  }

  getManageCode() {
    this.employeeService.getManage().subscribe(
      res => {
        this.listManage = res['data'];
        console.log('da goi vao day', this.listManage);
      }
    );
  }

  createForm() {
    this.employeeForm = this.fb.group({
      gender: [null],
      lastName: [null],
      firstName: [null],
      salary: [null],
      address: [null],
      birth: [null],
      email: [null, {validators: [Validators.required, Validators.email], updateOn: 'blur'}],
      phoneNumber: [null, {
        validators: [Validators.required, Validators.pattern('^[0-9; ]{8,}$')],
        updateOn: 'blur'
      }],
      manageCode: [null, [Validators.required]]
    });
  }

  onBack() {
    this.modalRef.hide();
  }

  openConfirm(pobjTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(pobjTemplate, {
        ignoreBackdropClick: true
      }
    );
  }

  close() {
    this.dialogRef.close();
  }

  saveEmployee() {
    const firstName = this.employeeForm.controls['firstName'].value === '' ? null :
      this.employeeForm.controls['firstName'].value;
    const lastName = this.employeeForm.controls['lastName'].value === '' ? null :
      this.employeeForm.controls['lastName'].value;
    const email = this.employeeForm.controls['email'].value === '' ? null :
      this.employeeForm.controls['email'].value;
    const address = this.employeeForm.controls['address'].value === '' ? null :
      this.employeeForm.controls['address'].value;
    const phoneNumber = this.employeeForm.controls['phoneNumber'].value === '' ? null :
      this.employeeForm.controls['phoneNumber'].value;
    const salary = this.employeeForm.controls['salary'].value === '' ? null :
      this.employeeForm.controls['salary'].value;
    const gender = this.employeeForm.controls['gender'].value === '' ? null :
      this.employeeForm.controls['gender'].value;
    const birth = this.employeeForm.controls['birth'].value === '' ? null :
      this.employeeForm.controls['birth'].value;

    const modelUser = new EmployeeModel(null, null, email, null, firstName, lastName,
      phoneNumber, address, this.employeeForm.controls['manageCode'].value, salary, null, null, gender, birth);
    console.log('createEmployee', modelUser);
    this.employeeService.addEmployeeAPI(modelUser).subscribe(
      data => {
        if (data['code'] === 200) {
          if (data['data'] === 'SUCCESS') {
            this.success('Thêm mới thành công');
          } else {
            this.error('Thêm mới thất bại');
          }
        } else {
          this.error('Đã xảy ra lỗi');
        }
      }
    );
    this.onBack();
  }

  success(message: string) {
    this.toastr.success(message, '');
  }

  error(message: string) {
    this.toastr.error(message, 'Lỗi');
  }
}
