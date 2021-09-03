import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from '../payload/recipe.model';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import * as fromApp from '../../../store/reducers/app.reducer';
import * as RecipesActions from '../../../store/actions/recipe.actions';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(new RecipesActions.FetchRecipes());

    return this.actions$.pipe(ofType(RecipesActions.FETCH_RECIPES), take(1));
  }
}
