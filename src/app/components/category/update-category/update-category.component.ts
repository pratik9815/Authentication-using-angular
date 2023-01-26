import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/Service/category/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

@Input('update-category-details') updateCategoryDetails : any;

@Output('call-back-category') callBack = new EventEmitter<object>();

  categoryForm: any;
  submitted: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _toastrService: ToastrService,
    private _categoryService: CategoryService) { }


  ngOnInit(): void {
    this.categoryForm = this._formBuilder.group({
      id: [null],
      categoryName: ['', [Validators.required]],
    });

    this.categoryForm.patchValue(this.updateCategoryDetails);
  }
  get getFormControl() {
    return this.categoryForm.controls;
  }
  onUpdateCategory() {
    this.submitted = true;
    if (this.categoryForm.invalid) return;

    this._categoryService.updateCategory(this.categoryForm.value).subscribe({
      next: data => {
        this._toastrService.info("The category has been updated", "Success");
        this.callBack.emit();
      },
      error: err => {
        this._toastrService.error("The category added failed", "Error");
      }
    });

  }
}
