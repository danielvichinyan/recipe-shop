import { Component, OnInit } from '@angular/core';
import { Recipe } from '../payload/recipe.model';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(
    private recipesService: RecipesService
  ) {

  }

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipesService.recipeSelected.emit(recipe);
  }
}
