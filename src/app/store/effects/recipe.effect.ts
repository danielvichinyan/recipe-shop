import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from 'src/app/main/recipes/payload/recipe.model';
import * as RecipesActions from '../actions/recipe.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {
  fetchRecipes = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipesActions.FETCH_RECIPES),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          'https://recipe-book-d8de5-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          }; // copy the recipe and if it has ingredients array, add it
          // if it does not have ingredients array, add an empty array
        });
      }),
      map((recipes) => {
        return new RecipesActions.SetRecipes(recipes);
      })
    );
  });

  constructor(private actions$: Actions, private http: HttpClient) {}
}
