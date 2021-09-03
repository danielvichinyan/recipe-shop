// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

// Reducers
import * as fromApp from './store/reducers/app.reducer';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { AuthComponent } from './auth/auth.component';
import { RecipesComponent } from './main/recipes/recipes.component';
import { RecipeListComponent } from './main/recipes/recipe-list/recipe-list.component';
import { RecipeStartComponent } from './main/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './main/recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './main/recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './main/recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './main/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './main/shopping-list/shopping-edit/shopping-edit.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

// Directives
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { AuthInterceptorService } from './auth/interceptors/auth-interceptor.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effect';
import { environment } from '../environments/environment';
import { RecipeEffects } from './store/effects/recipe.effect';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer), // npm install --save @ngrx/store
    EffectsModule.forRoot([AuthEffects, RecipeEffects]), // npm install --save @ngrx/effects
    StoreDevtoolsModule.instrument({ logOnly: environment.production }), // npm install --save-dev @ngrx/store-devtols
    StoreRouterConnectingModule.forRoot() // npm install --save @ngrx/router-store 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
