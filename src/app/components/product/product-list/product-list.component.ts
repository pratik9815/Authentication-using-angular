import { Component, OnInit } from '@angular/core';
import {
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  AppearanceAnimation
} from '@costlydeveloper/ngx-awesome-popup';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/Service/category/category.service';
import { ProductService } from 'src/app/Service/product.service';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
//   template: `
//   <ng-select [items]="options" (change)="onOptionSelected($event)"></ng-select>
// `
})
export class ProductListComponent implements OnInit {



  listProduct: any;
  //for ag-grid
  productColDef: any;
  productData: any;
  productDataClone:any;
  gridApi: any;
  gridColumnApi: any;
  domLayout: any;
  quickSearchValue: any;

  updateProductDetails: any;

  categoryList:any;
  categoryListClone:any;

  categoryName:any;


  productId:any;
  //for model popup
  addProductPopUpModal: boolean = false;
  updateProductPopUpModal: boolean = false;
  CategoryPopUpModal: boolean = false;

  constructor(private _productService: ProductService,
     private _toastrService: ToastrService,
     private _categoryService:CategoryService) {
      // this.getCategory();

      // this.categoryList = this.getCategory();

      // console.log(this.categoryList)

      this.domLayout = "autoHeight";
  }

  ngOnInit(): void {
    this.getProduct();
    this.productColDef = [
      { headerName: "S.N", valueGetter: 'node.rowIndex+1', width: 40, resizable: true },
      { headerName: "Name", field: 'name', sortable: true, resizable: true,filter: true, width: 100 },
      { headerName: "Description", field: 'description', sortable: true, resizable: true, width: 100 },
      { headerName: "Unit Price", field: 'price', sortable: true, resizable: true, width: 100 },
      // { headerName: "Category", field: 'categoryLists', sortable: true, resizable: true, width: 100 },
      { headerName: "Actions", field: 'action', cellRenderer: this.actions(), pinned: 'right', resizable: true, width: 100 },     
  ];
}

  public actions() {
    return  (params: any) => {
      if(params.data.categoryLists.length === 0){
        return `<button type="button" data-action-type="Cateogry" class="btn ag-btn btn-secondary" 
        data-toggle="tooltip" data-placement="bottom" title = "Category" ><i class="fa-solid fa-plus"></i></button> &nbsp; &nbsp;
    
      <button type="button" data-action-type="Edit" class="btn ag-btn btn-primary"  
              data-toggle="tooltip" data-placement="bottom" title = "Edit" ><i class="fa-solid fa-pen-to-square"></i></button> &nbsp; &nbsp;

              <button type="button" data-action-type="Remove" class="btn ag-btn btn-danger" 
              data-toggle="tooltip" data-placement="bottom" title = "Remove" ><i class="fa-solid fa-trash"></i></button>`;
      }
      return ` <button type="button" data-action-type="Cateogry" class="btn ag-btn btn-secondary" 
                data-toggle="tooltip" data-placement="bottom" title = "Category" ><i class="fa-solid fa-pen-nib"></i></button> &nbsp; &nbsp;
   
      <button type="button" data-action-type="Edit" class="btn ag-btn btn-primary"  
              data-toggle="tooltip" data-placement="bottom" title = "Edit" ><i class="fa-solid fa-pen-to-square"></i></button> &nbsp; &nbsp;

              <button type="button" data-action-type="Remove" class="btn ag-btn btn-danger" 
              data-toggle="tooltip" data-placement="bottom" title = "Remove" ><i class="fa-solid fa-trash"></i></button>`;
    }
  }

  getCategory()
  {
    this._categoryService.getCategory()
    .subscribe({
        next:(res:any) =>{
        this.categoryList =  res;
        this.categoryListClone = [...res];
      },
      error:err =>{
         console.log(err);
      }
    }
      
    )
  }

  onChange(e: any)
  {
    console.log(e.value)
  }

  getProduct() {
    this._productService.GetProducts().subscribe({
      next: res => {
        this.productData = res;
        this.productDataClone = [...res];
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onRowClicked(e: any) {
    if (e.event.target) { 
      let data = e.data;
      let actionType = e.event.target.getAttribute("data-action-type");

      switch (actionType) {
        case "Edit": {
          this.updateProductDetails = data;
          this.updateProductPopUpModal = true;

          break;
        }
        case "Remove": {
          return this.onOpenDialog(data);
        }
        case "Cateogry":{
          this.productId = data.id;
          this.CategoryPopUpModal = true;
          break;
        }
      }
    }
  }

  onFilterChanged(e: any) {
    e.api.refreshCells();
  }

  onQuickFilterChanged() {
    this.gridApi.setQuickFilter(this.quickSearchValue);
  }

  onModelUpdated() {
    setTimeout(() => { this.gridColumnApi.autoSizeAllColumns() });
  }

  onAddNewProductPopUp() {
    this.addProductPopUpModal = true;
  }

  close() {
    this.addProductPopUpModal = false;
    this.updateProductPopUpModal = false;
    this.CategoryPopUpModal = false;
  }

  onOpenDialog(row: any) {
    const newConfirmBox = new ConfirmBoxInitializer();

    newConfirmBox.setTitle('Warning!!!');
    newConfirmBox.setMessage('Are you sure you want to remove this product?');
    newConfirmBox.setButtonLabels('YES', 'NO');
    // Choose layout color type
    newConfirmBox.setConfig({
      layoutType: DialogLayoutDisplay.WARNING,// SUCCESS | INFO | NONE | DANGER | WARNING
      animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
      animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
    });

    // Simply open the popup
    newConfirmBox.openConfirmBox$().subscribe((res: any) => {
      if (res.clickedButtonID === 'yes') {
        this._productService.DeleteProduct(row.id).subscribe({
          next: res => {
            this._toastrService.success('Product removed successfully.', 'Success!');
            this.getProduct();
          },
          error: err => {
            this._toastrService.error('Something went wrong! Please try again...', 'Error!');
          }
        });
      }
    });
  }

  callBack(): void {
    this.close();
    this.getProduct();
  }

}
