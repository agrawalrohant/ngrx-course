import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState } from "./reducers/course.reducer";
import * as fromCouses from "./reducers/course.reducer";

export const selectCoursesState  = 
createFeatureSelector<CoursesState>("courses");


export const selectAllCourses = createSelector(
    selectCoursesState,
    fromCouses.selectAll
);

export const selectBeginnerCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(courses => courses.category == 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(courses => courses.category == 'ADVANCED')
);

export const selectPromoTotal = createSelector(
    selectAllCourses,
    courses => courses.filter(courses => courses.promo).length
);

export const areCoursesLoaded = createSelector(
    selectCoursesState,
    state => state.allCoursesLoaded
);