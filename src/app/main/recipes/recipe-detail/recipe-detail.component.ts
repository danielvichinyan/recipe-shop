import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../payload/recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/reducers/app.reducer';
import * as RecipesActions from '../../../store/actions/recipe.actions';
import * as ShoppingListActions from '../../../store/actions/shopping-list.actions';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    // 1st way
    this.route.params
      .pipe(
        map((params) => {
          return +params['id']; // return and get the id from the path params
        }),
        switchMap((id) => {
          // create another observable and pass the id
          this.id = id;
          return this.store.select('recipes'); // return the recipes state from the store
        }),
        map((recipesState) => {
          // get the recipes state
          return recipesState.recipes.find((recipe, index) => {
            // find the recipe with the same id
            return index === this.id; // return that recipe
          });
        })
      )
      .subscribe((recipe) => {
        // subscribe to the observable that carries the found recipe
        this.recipe = recipe;
      });

    // 2nd way

    // this.route.params.subscribe((params: Params) => {
    //   this.id = +params['id']; // cast with +
    //   this.store
    //     .select('recipes') // returns an observable
    //     .pipe(
    //       map((recipesState) => {
    //         return recipesState.recipes.find((recipe, index) => {
    //           return index === this.id;
    //         });
    //       })
    //     )
    //     .subscribe((recipe) => {
    //       this.recipe = recipe;
    //     });
    // });
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
