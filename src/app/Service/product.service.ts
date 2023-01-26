import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl: string = 'https://localhost:7028/api/Product/';
  
   constructor(private _httpClient:HttpClient) { }

   GetProducts()
   {
      return this._httpClient.get<any[]>(this.apiUrl+'get-product');
   }
   CreateProduct(value:any)
   {
      return this._httpClient.post(this.apiUrl+'create-product',value);
   }
   DeleteProduct(productId:any)
   {
      return this._httpClient.delete(this.apiUrl+'delete-product/'+productId);
   }
   UpdateProduct(value:any)
   {
      return this._httpClient.put(this.apiUrl+'update-product',value)
   }


}
