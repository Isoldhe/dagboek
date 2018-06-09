import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {RegisterService} from "../services/register.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private registerService: RegisterService,
              private router: Router) {}

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      console.log('in AuthGuard canActivate(), returning true, activating /home route');
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    console.log('in AuthGuard canActivate(), returning false and redirecting to /login');
    this.router.navigate(['/login']);
    return false;
  }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }
}
