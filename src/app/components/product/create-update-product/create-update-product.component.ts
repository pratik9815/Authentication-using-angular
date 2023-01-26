import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/Service/category/category.service';
import { ProductService } from 'src/app/Service/product.service';


@Component({
  selector: 'app-create-update-product',
  templateUrl: './create-update-product.component.html',
  styleUrls: ['./create-update-product.component.css']
})
export class CreateUpdateProductComponent implements OnInit {



  @Output("callBack-product") callBack = new EventEmitter<object>();
  productForm: any;
  productData: any;
  submitted: boolean = false;
  isUpdated: boolean;

  categoryList:any;
  
  constructor(private _productService: ProductService,
    private _toastrService: ToastrService,
    private _formBuilder: FormBuilder,
    private _categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getCategoryForDropdown();

    this.productForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoryId:[null],
    });
    
  }

  get getFormControl() {
    return this.productForm.controls;
  }

  onCreateOrUpdateProduct() {
    this.submitted = true;
    if (this.productForm.invalid) return;

      this._productService.CreateProduct(this.productForm.value).subscribe({
        next: data => {
          this._toastrService.info("The product has been added", "Success");
          this.callBack.emit();
        },
        error: err => {
          this._toastrService.error("The product added failed", "Error");
        }
      });
  }
  getCategoryForDropdown():void
  {
    this._categoryService.getCategory().subscribe({
      next: res =>{
        console.log(res);
        this.categoryList = res;
      },
      error: err =>{
        console.log(err)
      }
    })
  }
  onChange(e: any)
  {
      this.productForm.value.categoryId = e.id;
  }

}
