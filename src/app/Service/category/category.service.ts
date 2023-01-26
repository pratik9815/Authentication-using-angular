import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl: string = 'https://localhost:7028/api/Cateogry/';

  constructor(private _httpClient:HttpClient) { }


  getCategory()
  {
    return this._httpClient.get(this.apiUrl+'get-all-categories');
  }
  createCategory(value:any)
  {
     return this._httpClient.post(this.apiUrl+'create-category',value);
  }
  deleteCategory(categoryId:any)
  {
     return this._httpClient.delete(this.apiUrl+'delete-category/'+categoryId);
  }
  updateCategory(value:any)
  {
     return this._httpClient.put(this.apiUrl+'update-category',value)
  }
}
