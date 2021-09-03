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
    default:
      return state;
  }
}
