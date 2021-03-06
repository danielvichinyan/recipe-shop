import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromApp from '../../store/reducers/app.reducer';
import * as AuthActions from '../../store/actions/auth.actions';
import * as RecipesActions from '../../store/actions/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private userSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.userSub = this.store
      .select('auth') // returns object of type Auth State which has a user property
      .pipe(map((authState) => authState.user)) // pull out the user property of the auth state
      .subscribe((user) => {
        this.isAuthenticated = !user ? false : true; // if no user object -> isAuthenticated = false, otherwise true (if a user object is present)
      });
  }

  onSaveData() {
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe;
  }
}
