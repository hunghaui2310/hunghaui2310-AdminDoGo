import {Component, OnInit, TemplateRef} from '@angular/core';
import {ProductModel} from '../../../model/product.model';
import {CategoryModel} from '../../../model/category.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {ProductService} from '../../../services/product.service';
import {ExcelService} from '../../../services/excel.service';
import {CategoryService} from '../../../services/category.service';
import {DialogProductComponent} from './dialog-product/dialog-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  listProduct: ProductModel[];
  listCate: CategoryModel[];
  currentP = 1;
  pageSize = 15;
  formProduct: FormGroup;
  private modalRef: BsModalRef;
  productId;
  dataCreate;

  constructor(private productService: ProductService,
              private formBuilder: FormBuilder,
              private excelService: ExcelService,
              private modalService: BsModalService,
              public dialog: MatDialog,
              private toastr: ToastrService,
              private categoryService: CategoryService) {
    this.getAllProduct();
    this.getAllCate();
    this.createForm();
  }

  ngOnInit() {
  }

  getAllProduct() {
    this.productService.getAllProductAPI().subscribe(
      data => {
        this.listProduct = data['data'];
        console.log(data['data']);
      }
    );
  }
  pageChange(event: number) {
    this.currentP = event;
  }

  getAllCate() {
    this.categoryService.getAllCateAPI().subscribe(
      data => {
        this.listCate = data['data'];
        console.log(this.listCate);
      }
    );
  }

  createForm() {
    this.formProduct = this.formBuilder.group({
      productName: [''],
      fromPrice: [''],
      toPrice: [''],
      category: [null]
    });
  }

  search() {
    this.currentP = 1;
    let productName: string;
    if (this.formProduct.controls['productName'].value === '') {
      productName = null;
    } else {
      productName = this.formProduct.controls['productName'].value;
    }
    const priceFrom = this.formProduct.controls['fromPrice'].value === '' ? null :
      this.formProduct.controls['fromPrice'].value;
    const toPrice = this.formProduct.controls['toPrice'].value === '' ? null :
      this.formProduct.controls['toPrice'].value;

    const modelSearch = new ProductModel(null, productName, null, null, null, null,
      null, null, null, null, this.formProduct.controls['category'].value,
      null, null, null, null, null, priceFrom, toPrice);
    console.log('dataSearch', modelSearch);
    this.productService.searchProductAPI(modelSearch).subscribe(
      data => {
        this.listProduct = data['data'];
        console.log('resultSearch', this.listProduct);
      }
    );
  }

  onBack() {
    this.modalRef.hide();
  }

  openConfirm(pobjTemplate: TemplateRef<any>, id: number) {
    this.productId = id;
    this.modalRef = this.modalService.show(pobjTemplate, {
        ignoreBackdropClick: true
      }
    );
  }

  removeProduct() {
    const deleteModel = new ProductModel(this.productId);
    console.log('productId', deleteModel);
    this.productService.deleteProductAPI(deleteModel).subscribe(
      data => {
        if (data['code'] === 200) {
          if (data['data'] === 'SUCCESS') {
            this.success('Xóa thành công');
          } else {
            this.error('Xóa thất bại');
          }
          this.getAllProduct();
          this.onBack();
        } else {
          this.error('Đã xảy ra lỗi');
        }
      }
    );
  }

  success(message: string) {
    this.toastr.success(message, '');
  }

  error(message: string) {
    this.toastr.error(message, 'Lỗi');
  }

  showModalAdd() {
    const dialogRef = this.dialog.open(DialogProductComponent, {
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

  // getFileToBase64(event) {
  //   const fileName = event.target.files[0].name;
  //   const file = event.target.files[0];
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function () {
  //     console.log('File name : ', fileName);
  //     console.log('Result File : ', reader.result);
  //     return reader.result;
  //   }
  //   reader.onerror = function (error) {
  //     console.log('Error', error);
  //   };
  // }

  download(row: ProductModel[]): void {
    console.log('dataToDownload', row);
    this.excelService.downloadExcel(row, 'test');
  }
}
