import { Injectable, EventEmitter } from "@angular/core";
import { Ingredient } from "src/app/shared/payload/ingredient.model";
import { ShoppingListService } from "src/app/shopping-list/services/shopping-list.service";
import { Recipe } from "../payload/recipe.model";

@Injectable({
    providedIn: 'root' 
})
export class RecipesService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe', 
            'This is simply a test', 
            'https://www.simplyrecipes.com/thmb/OCi18J2V8OeKDFV3FxoeKvgq74E=/1423x1067/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2012__07__grilled-sweet-potatoes-horiz-a-1600-7c8292daa98e4020b447f0dc97a45cb7.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('Fries', 20)
            ]
        )
    ];

    constructor(
        private shoppingListService: ShoppingListService
    ) {
        
    }

    getRecipes() {
        return this.recipes.slice(); // get a copy by slice
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}