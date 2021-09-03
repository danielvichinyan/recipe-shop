import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../reducers/shopping-list.reducer';
import * as fromAuth from '../reducers/auth.reducer';
import * as fromRecipes from '../reducers/recipe.reducer';

export interface AppState {
    shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
    recipes: fromRecipes.State
}

// Bringing all states to make up the whole global app state
export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer,
    recipes: fromRecipes.recipeReducer
};