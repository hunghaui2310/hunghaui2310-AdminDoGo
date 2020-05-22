import {Component, Inject, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryModel} from '../../../../model/category.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {ProductService} from '../../../../services/product.service';
import {CategoryService} from '../../../../services/category.service';
import {ProductModel} from '../../../../model/product.model';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss']
})
export class DialogProductComponent implements OnInit {

  productForm: FormGroup;
  isPreSpace: boolean;
  listCategory: CategoryModel[];
  nameFile: string;
  bigFile;
  smallFile;
  private modalRef: BsModalRef;

  validation_messages = {
    'productName': [
      {type: 'required', message: 'Tên sản phẩm không được để trống'}
    ],
    'category': [
      {type: 'required', message: 'Thể loại không được để trống'}
    ],
    'price': [
      {type: 'required', message: 'Giá sản phẩm không được để trống'}
    ],
    'description': [
      {type: 'required', message: 'Mô tả không được để trống'}
    ],
    'bigFile': [
      {type: 'required', message: 'Chưa chọn File'}
    ]
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DialogProductComponent>,
              private fb: FormBuilder,
              private http: HttpClient,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private productService: ProductService,
              private cateService: CategoryService) {
    if (this.data['isCreate']) {
      this.formCreate();
    } else {
      this.formEdit();
    }
    this.getAllCate();
  }

  ngOnInit() {
  }

  formEdit() {
    this.productForm = this.fb.group({
      productName: [this.data['dataEdit']['productName'], {validators: [Validators.required]}],
      category: [this.data['dataEdit']['categoryId'], {validators: [Validators.required]}],
      price: [this.data['dataEdit']['price'], {validators: [Validators.required]}],
      codeDiscount: [this.data['dataEdit']['codeDiscount']],
      discount: [this.data['dataEdit']['discount']],
      description: [this.data['dataEdit']['description'], {validators: [Validators.required]}],
      bigFile: [this.data['dataEdit']['urlImage'], {validators: [Validators.required]}],
      smallFile: [this.data['dataEdit']['smallFile'], {validators: [Validators.required]}]
    });
  }

  formCreate() {
    this.productForm = this.fb.group({
      productName: ['', {validators: [Validators.required]}],
      category: [null, {validators: [Validators.required]}],
      price: ['', {validators: [Validators.required]}],
      codeDiscount: [''],
      discount: [''],
      description: ['', {validators: [Validators.required]}],
      bigFile: ['', {validators: [Validators.required]}],
      smallFile: ['', {validators: [Validators.required]}]
    });
  }

  openConfirm(pobjTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(pobjTemplate, {
        ignoreBackdropClick: true
      }
    );
  }

  getAllCate() {
    this.cateService.getAllCateAPI().subscribe(
      data => {
        this.listCategory = data['data'];
      }
    );
  }

  close() {
    this.dialogRef.close();
  }

  checkSpace(event) {
    if ((event.target.value || '').trim().length === 0) {
      this.isPreSpace = true;
    } else {
      this.isPreSpace = false;
    }
  }

  bigFileToBase64(event) {
    const fileName = event.target.files[0].name;
    this.nameFile = fileName;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = _event => {
      console.log('Result File : ', reader.result);
      this.bigFile = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error', error);
    };
  }

  smallFileToBase64(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = _event => {
      console.log('Result File : ', reader.result);
      this.smallFile = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error', error);
    };
  }

  saveProduct() {
    const productName = this.productForm.controls['productName'].value;
    const category = this.productForm.controls['category'].value;
    const price = this.productForm.controls['price'].value;
    const codeDiscount = this.productForm.controls['codeDiscount'].value;
    const discount = this.productForm.controls['discount'].value;
    const description = this.productForm.controls['description'].value;

    const modelPro = new ProductModel(null, productName, price, null, discount, this.nameFile, null,
      null, description, null, category, null, null, null, codeDiscount,
      null, null, null, this.bigFile, this.smallFile);
    console.log('Model Product Create', modelPro);
    this.productService.insertProductAPI(modelPro).subscribe(
      data => {
        if (data['code'] === 200) {
          if (data['data'] === 'SUCCESS') {
            this.notiSuccess('Thêm mới thành công');
          } else {
            this.notiError('Thêm mới thất bại');
          }
        } else {
          this.notiError('Đã xảy ra lỗi');
        }
        this.close();
        this.getAllCate();
      }
    );
  }

  notiSuccess(message: string) {
    this.toastr.success(message, '');
  }

  notiError(message: string) {
    this.toastr.error(message, 'Lỗi');
  }

  onBack() {
    this.modalRef.hide();
  }
}
