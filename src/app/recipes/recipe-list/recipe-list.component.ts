import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipesService.recipeSelected.emit(recipe);
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  } 
}
