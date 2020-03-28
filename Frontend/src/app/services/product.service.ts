import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductModel} from '../model/product.model';
import {Observable} from 'rxjs';
import {appConfig} from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getAllProductAPI(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(appConfig.get_product_api);
  }

  searchProductAPI(product: ProductModel) {
    return this.http.post(appConfig.search_product_API, product);
  }

  deleteProductAPI(product: ProductModel) {
    return this.http.post(appConfig.delete_product_API, product);
  }

  insertProductAPI(product: ProductModel) {
    return this.http.post(appConfig.insert_product_API, product);
  }
}
