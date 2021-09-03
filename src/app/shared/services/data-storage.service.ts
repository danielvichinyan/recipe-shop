import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/main/recipes/payload/recipe.model';
import { RecipesService } from 'src/app/main/recipes/services/recipes.service';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/reducers/app.reducer';
import * as RecipesActions from '../../store/actions/recipe.actions';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private store: Store<fromApp.AppState>
  ) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();

    this.http
      .put(
        'https://recipe-book-d8de5-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://recipe-book-d8de5-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            }; // copy the recipe and if it has ingredients array, add it
            // if it does not have ingredients array, add an empty array
          });
        }),
        tap((recipes) => {
          this.store.dispatch(new RecipesActions.SetRecipes(recipes));
        })
      );
  }
}
