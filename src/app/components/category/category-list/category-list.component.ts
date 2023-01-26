import { Component, OnInit } from '@angular/core';
import { AppearanceAnimation, ConfirmBoxInitializer, DialogLayoutDisplay, DisappearanceAnimation } from '@costlydeveloper/ngx-awesome-popup';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/Service/category/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categoryColDef:any;
  categoryData:any;
  gridApi: any;
  gridColumnApi: any;
  domLayout:any;

  updateCategoryDetails:any;

  quickSearchValue:any;
  addCategoryPopUpModal:boolean = false;
  updateCategoryPopUpModal:boolean = false;

  constructor(private _categoryService:CategoryService,
    private _toastrService:ToastrService) { 
    this.domLayout = "autoHeight";
  }

  ngOnInit(): void {
    this.getCategory();
    this.categoryColDef = [
      { headerName: "S.N", valueGetter: 'node.rowIndex+1', width: 40, resizable: true },
      { headerName: "Name", field: 'categoryName', sortable: true, resizable: true, width: 100 },
      { headerName: "Actions", field: 'action', cellRenderer: this.actions(),pinned: 'right', resizable: true, width: 100},
    ];
  }

  public actions() {
    return function(params :  any){
      return `<button type="button" data-action-type="Edit" class="btn ag-btn btn-primary"  
              data-toggle="tooltip" data-placement="bottom" title = "Edit" >  Edit </button > &nbsp; &nbsp;
              <button type="button" data-action-type="Remove" class="btn ag-btn btn-danger" 
              data-toggle="tooltip" data-placement="bottom" title = "Remove" >  Remove </button >`;
    }
       
  }

  getCategory() {
   this._categoryService.getCategory().subscribe({
    next: res => {
      this.categoryData = res;
    },
    error: err => {
      console.log(err);
    }
   })
  }

  onGridReady(params : any){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }


  onRowClicked(e : any){
    if (e.event.target) {
      let data = e.data;
      let actionType = e.event.target.getAttribute("data-action-type");

      switch (actionType) {
        case "Edit": {
          this.updateCategoryDetails = data;
          this.updateCategoryPopUpModal = true;

          break;
        }
        case "Remove": {
            return this.onOpenDialog(data);
          
        }
      }
    }
  }

  onFilterChanged(e : any){
    e.api.refreshCells();
  }

  onQuickFilterChanged() {
    this.gridApi.setQuickFilter(this.quickSearchValue);
    
  }
 

  onModelUpdated() {
    setTimeout(() => { this.gridColumnApi.autoSizeAllColumns() });
    
  }
  onAddNewCategoryPopUp(){
    this.addCategoryPopUpModal = true;
  }

  close(){
    this.addCategoryPopUpModal = false;
    this.updateCategoryPopUpModal = false;
  }


  onOpenDialog(row: any){
    const newConfirmBox = new ConfirmBoxInitializer();

    newConfirmBox.setTitle('Warning!!!');
    newConfirmBox.setMessage('Are you sure you want to remove this category?');
    newConfirmBox.setButtonLabels('YES', 'NO');
    // Choose layout color type
    newConfirmBox.setConfig({
    layoutType: DialogLayoutDisplay.WARNING,// SUCCESS | INFO | NONE | DANGER | WARNING
    animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
    animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
    });

    // Simply open the popup
    newConfirmBox.openConfirmBox$().subscribe((res: any) =>{
      if(res.clickedButtonID ==='yes'){
        this._categoryService.deleteCategory(row.id).subscribe({
          next: res =>{
          this._toastrService.success('Category removed successfully.','Success!');
          this.getCategory();
        },
        error: err=>{
          this._toastrService.error('Something went wrong! Please try again...','Error!');
        }
      });
      }
    });
  }
  callBack():void
  {
      this.close();
      this.getCategory();
  }

}
