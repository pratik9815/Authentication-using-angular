import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/Service/category/category.service';
import { ProductcategoryService } from 'src/app/Service/productcategory/productcategory.service';

@Component({
  selector: 'app-selectcategory',
  templateUrl: './selectcategory.component.html',
  styleUrls: ['./selectcategory.component.css']
})
export class SelectcategoryComponent implements OnInit {

  @Input("product-id") productId: any;

  @Output("callBack-product-category") callback = new EventEmitter<object>();

  categoryList: any =[];



  //for reactive form
  categoryForm: any;
  submitted: boolean = false;
  constructor(private _categoryService: CategoryService,
     private _formBuilder: FormBuilder,
     private _productCategoryService:ProductcategoryService,
     private _toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getCategoryList();

    this.categoryForm = this._formBuilder.group({
      productId: [null],
      itemRows: this._formBuilder.array([]),
    });

    
  }

  // initItemRows(): FormGroup {
  //   return this._formBuilder.group({
  //     // list all your form controls here, which belongs to your form array
  //     categoryId: [''],
  //   });
  // }

  get categoryFormArray() {
    return this.categoryForm.controls.itemRows as FormArray;
  }

  private addCheckboxes() {
    this.categoryList.forEach(() => this.categoryFormArray.push(new FormControl(false)));
  }
  // addNewRow() {
  //   // control refers to your form array
  //   const control = <FormArray>this.categoryForm.controls['itemRows'];
  //   //add new formgroup
  //   control.push(this.initItemRows());
  // }

  onSubmitCategoryForm() {
    this.categoryForm.controls.itemRows;
    this.submitted = true;
    if (this.categoryForm.invalid) return;
    this.categoryForm.value.productId = this.productId;

    const selectedCategoryIds = this.categoryForm.value.itemRows
    .map((checked:any, i:any) => checked ? this.categoryList[i].id : null)
    .filter((v:any) => v !== null);

  let requestData = {
    productId : this.productId,
    categoryId : [] as any[] 
  }
    for(let i = 0; i<selectedCategoryIds.length;i++)
    {
      requestData.categoryId.push(selectedCategoryIds[i]);
    }
    this._productCategoryService.createProductCategory(requestData).subscribe({
      next: res =>{
          this._toastrService.success('Product category added successfully','Success');
          this.callback.emit();
      },
      error: err=>{
        this._toastrService.error('Product category added failed','Failed');
      }
    })
  }

  getCategoryList() {
    this._categoryService.getCategory().subscribe({
      next: res => {
        this.categoryList = res;
        this.addCheckboxes();
      },
      error: err => {
        console.log(err);
      }
    })
  }

  onChangeCategoryList(e:any)
{
  console.log(e);
}

}
