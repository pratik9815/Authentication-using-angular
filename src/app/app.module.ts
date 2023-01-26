import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Component/Portal/login/login.component';
import { SignupComponent } from './Component/Portal/signup/signup.component';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorInterceptor } from './Interceptor/token-interceptor.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './Service/auth.service';
import { AuthGuard } from './Guard/auth.guard';
import { SidebarComponent } from './Component/sidebar/sidebar.component';
import { LocationStrategy } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';


import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ChipsModule} from 'primeng/chips';
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { CreateUpdateProductComponent } from './components/product/create-update-product/create-update-product.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UpdateProductComponent } from './components/product/update-product/update-product.component';
import { UpdateCategoryComponent } from './components/category/update-category/update-category.component';
import { CreateCategoryComponent } from './components/category/create-category/create-category.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectcategoryComponent } from './components/product/selectcategory/selectcategory.component';
import { ProductcategoryService } from './Service/productcategory/productcategory.service';
import { ProductService } from './Service/product.service';
import { CategoryService } from './Service/category/category.service';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    SidebarComponent,
  
  
    ProductListComponent,
    CreateUpdateProductComponent,
    CategoryListComponent,
    DashboardComponent,
    UpdateProductComponent,
    UpdateCategoryComponent,
    CreateCategoryComponent,
    SelectcategoryComponent,
    UserListComponent,
    CreateUserComponent,
    UpdateUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AgGridModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      // closeButton: true,
      progressBar: true,
      tapToDismiss: true,
      preventDuplicates: true,
      countDuplicates: false,
      easeTime: 800,
      positionClass: 'toast-bottom-right'
    }),
    NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
    ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
    ToastNotificationConfigModule.forRoot(), // Needed for instantiating toast notifications.

    
    TableModule,
    ButtonModule,
    SplitButtonModule,
    ChipsModule,
    InputTextModule,
    DialogModule,
    ConfirmDialogModule,
    MessagesModule,
    ConfirmPopupModule,
    
    NgSelectModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    ProductcategoryService,
    ProductService,
    CategoryService,
    {provide: HTTP_INTERCEPTORS, useClass:TokenInterceptorInterceptor,multi:true}, 
    ConfirmationService,
    MessageService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }  
