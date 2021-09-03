import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../payload/recipe.model';
import { RecipesService } from '../services/recipes.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/reducers/app.reducer';
import * as RecipesActions from '../../../store/actions/recipe.actions';
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
    private recipesService: RecipesService,
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
        switchMap((id) => { // create another observable and pass the id
          this.id = id;
          return this.store.select('recipes'); // return the recipes state from the store
        }),
        map((recipesState) => { // get the recipes state
          return recipesState.recipes.find((recipe, index) => { // find the recipe with the same id
            return index === this.id; // return that recipe
          });
        })
      )
      .subscribe((recipe) => { // subscribe to the observable that carries the found recipe
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
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
