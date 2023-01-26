import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './Service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  isLoggedIn$ : Observable<boolean>;


  title = 'Authentication';
  constructor(private _authService:AuthService){ 
    this._authService.showLoginPageIfTokenExpries();
   }
  
  ngOnInit(): void {
    this.isLoggedIn$ = this._authService.isLoggedIn$;  

     this._authService.isLoggedIn$.subscribe({
      next: res =>{
        console.log(res);
        if(res)
        {
          setTimeout(()=>{
            this._authService.showLoginPageIfTokenExpries();
            console.log("this is from timeout")
          },60003)
        //   setInterval(() => {
        //     this._authService.showLoginPageIfTokenExpries();
        //     console.log("the timer has started")
        // }, 6000); 
        }
      }
    });
   

  }


}
