import { Recipe } from 'src/app/main/recipes/payload/recipe.model';
import * as RecipesActions from '../actions/recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export function recipeReducer(
  state = initialState,
  action: RecipesActions.RecipesActions
) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state, // copy the old state
        recipes: [...action.payload], // override the recipes with the recipes we find in the action payload
        // with the spread operator (...) we take all the recipes from the payload and add them
      };
    case RecipesActions.ADD_RECIPE:
      return {
        ...state, // copy the old state
        recipes: [...state.recipes, action.payload], // updated list of recipes - the old list plus the new recipe to be added
      };
    case RecipesActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe,
      }; // fetch the updated recipe

      const updatedRecipes = [...state.recipes]; // fetch the updated list of recipes

      updatedRecipes[action.payload.index] = updatedRecipe; // override the element at the correct index in the updated list

      return {
        ...state,
        recipes: updatedRecipes,
      };
    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          // .filter() returns a copy of the list so we dont mutate the old list
          return index !== action.payload; // don't return the element we want to remove
        }), // the recipes list will be the OLD list but WITHOUT the recipe that we want to remove
      };
    default:
      return state;
  }
}
