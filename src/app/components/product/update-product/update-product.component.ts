import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/Service/category/category.service';
import { ProductService } from 'src/app/Service/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  @Input("update-product-details") updateProductDetails: any;

  @Output("callBack-product") callBack = new EventEmitter<object>();
  productForm: any;
  productData: any;
  submitted: boolean = false;

  categoryList: any;
  constructor(private _productService: ProductService,
    private _toastrService: ToastrService,
    private _formBuilder: FormBuilder,
    private _categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getCategoryForDropdown();
    this.productForm = this._formBuilder.group({
      id: [null],
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoryId:[null],
    });

    this.productForm.patchValue(this.updateProductDetails);

  }

  get getFormControl() {
    return this.productForm.controls;
  }
  onCreateOrUpdateProduct():void {
    this.submitted = true;
    if (this.productForm.invalid) return;


    this._productService.UpdateProduct(this.productForm.value).subscribe({
      next: data => {
        this._toastrService.info("The product has been updated", "Success");
        this.callBack.emit();
      },
      error: err => {
        this._toastrService.error("The product update failed", "Error");
      }
    });


  }

  getCategoryForDropdown():void
  {
    this._categoryService.getCategory().subscribe({
      next: res =>{
        this.categoryList = res;
      },
      error: err =>{

      }
    })
  }

  onChange(e: any)
  {
      this.productForm.value.categoryId = e.id;
  }



}
