import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Ingredient } from "src/app/shared/payload/ingredient.model";
import { Recipe } from "../payload/recipe.model";
import * as ShoppingListActions from "../../../store/actions/shopping-list.actions";
import { Subject } from "rxjs";
import * as fromShoppingList from '../../../store/reducers/shopping-list.reducer';

@Injectable({
    providedIn: 'root' 
})
export class RecipesService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];

    constructor(
        private store: Store<fromShoppingList.AppState>
    ) {
        
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice(); // get a copy by slice
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}