import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import {ActivatedRouteSnapshot} from "@angular/router";
import {RouterStateSnapshot} from "@angular/router";
import { AppState } from "../reducers";
import { Store, select } from "@ngrx/store";
import { loadAllCourses } from "./course.action";
import { first, tap, filter, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { areCoursesLoaded } from "./courses.selector";

@Injectable()
export class CoursesResolver implements Resolve<any> {
    
    constructor(private store:Store<AppState>){}

    loading : boolean = false;

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.store.pipe(
            select(areCoursesLoaded),
            tap((coursesLoaded) => {
                if(!this.loading && !coursesLoaded){
                    this.loading = true;
                    this.store.dispatch(loadAllCourses());
                    this.loading = false;
                }
            }),
            filter(coursesLoaded => coursesLoaded),
            first(),
            finalize(() => this.loading = false)
        )
    }

}