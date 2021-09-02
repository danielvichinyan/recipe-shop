import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../shared/services/data-storage.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/reducers/app.reducer';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.userSub = this.store
      .select('auth') // returns object of type Auth State which has a user property
      .pipe(map((authState) => authState.user)) // pull out the user property of the auth state
      .subscribe((user) => {
        this.isAuthenticated = !user ? false : true; // if no user object -> isAuthenticated = false, otherwise true (if a user object is present)
      });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe;
  }
}
