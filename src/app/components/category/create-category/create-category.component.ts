import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/Service/category/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  @Output('call-back-category') callBack = new EventEmitter<object>();

  categoryForm:any;
  submitted:boolean = false;

  constructor(private _formBuilder:FormBuilder,private _toastrService:ToastrService,
    private _categoryService:CategoryService) { }

  ngOnInit(): void {
    this.categoryForm = this._formBuilder.group({
      categoryName: ['', [Validators.required]],
    });
  }
  get getFormControl() {
    return this.categoryForm.controls;
  }
  onCreateCategory() {
    this.submitted = true;
    if (this.categoryForm.invalid) return;

      this._categoryService.createCategory(this.categoryForm.value).subscribe({
        next: data => {
          this._toastrService.info("The category has been added", "Success");
          this.callBack.emit();
        },
        error: err => {
          this._toastrService.error("The category added failed", "Error");
        }
      });
    

  }

}
