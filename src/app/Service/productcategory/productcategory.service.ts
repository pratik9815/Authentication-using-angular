import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductcategoryService {

  constructor(private _httpClient:HttpClient) { }

  apiUrl = "https://localhost:7028/api/ProductCategory/create-product-category";

  createProductCategory(value:any)
  {
    return this._httpClient.post(this.apiUrl,value);
  }
}
