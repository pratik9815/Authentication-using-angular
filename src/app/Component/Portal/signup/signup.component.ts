import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm:any;
  constructor(private _formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this._formBuilder.group({
      email: new FormControl('',Validators.required),
      username: new FormControl('',Validators.required),
      phone: new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    })

  }

  onSignup()
  {
      console.log(this.signupForm.value);
  }
}
