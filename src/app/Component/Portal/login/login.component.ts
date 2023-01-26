import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { url } from 'inspector';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: any;
  visible:boolean =true;
  changeType:boolean = true;
  
  path  = 'assets/img/login.jpg';


  constructor(private _router: Router, private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.minLength(8), Validators.required]],
    });
  }
  // onSignin() {
  //   this._router.navigate(['signin']) 
  // }

  onLogin() {
    if (this.loginForm.invalid) return;
    this._authService.onLogin(this.loginForm.value).subscribe(
      {
        next: res => {  
          this._toastrService.success("Login successful", "success");
          this._router.navigate(['']);
        },
        error: error => {
          this._toastrService.error("Enter valid credentials", "Unauthorized");
        },
        complete: () =>{console.info('complete')}
      })
  }

  viewpass()
  {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }

}
