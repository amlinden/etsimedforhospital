import { Component, OnInit } from '@angular/core';
//import { LoginService } from "../login.service";
import { Router } from '@angular/router';
//import { AuthService } from '../providers/auth.service';
import { AuthService } from '../shared/auth.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  user = null;
  constructor(private auth: AuthService, public db: AngularFireDatabase, private router:Router) { }
  ngOnInit() {
    this.auth.getAuthState().subscribe(
      (user) => this.user = user);
  }
  loginWithGoogle() {
    this.auth.loginWithGoogle().then((data) => {
      this.router.navigate(['']);
    })
  }

  isLoggedin() {
    return this.auth.isLoggedin();
  }
}
// export class LoginComponent implements OnInit {

//   constructor(private _LoginService: LoginService){
    
//   }
//   onsubmit(){
//     console.log('submitted');
//   }
//   login(){
//     this._LoginService.login();
//   }

//   ngOnInit() {
//   }

// }
