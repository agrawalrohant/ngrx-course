import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthState } from "./reducers";
import { Store, select } from "@ngrx/store";
import { isLoggedIn } from "./auth.selectors";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthGaurd implements CanActivate{

    constructor(private store:Store<AuthState>, private router:Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>{
        return this.store.pipe(
            select(isLoggedIn),
            // side effect
            tap(isLoggedIn => {
                if(!isLoggedIn){
                    this.router.navigateByUrl('/login');
                }
            })
        );




    }

}