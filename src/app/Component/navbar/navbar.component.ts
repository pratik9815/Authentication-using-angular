import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 
  constructor(private _router:Router,private _authService:AuthService,private _toastrService:ToastrService) { }
  ngOnInit(): void {
  }

  onLogout()
  {
      this._authService.onLogout();
      this._toastrService.info("You are logged out","Logout")
  }
}
