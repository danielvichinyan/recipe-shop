import { Ingredient } from "src/app/shared/payload/ingredient.model";
import * as ShoppingListActions from "../actions/shopping-list.actions";

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1 
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state, // MUST! always copy the old state
                ingredients: [...state.ingredients, action.payload] // copy the elements from the old state and take the new object from the state
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state, // always copy the old state
                ingredients: [...state.ingredients, ...action.payload] // by using ... we add the elements of the new array
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex]; // get the object from the old state
            const updatedIngredient = {
                ...ingredient, // copy the properties of the old ingredients
                ...action.payload // override the properties of the old ingredient
            };
            const updatedIngredients = [...state.ingredients]; // copy the ingredients from the old state
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient; // replace the old ingredient with the updated one

            return {
                ...state, // always copy the old state
                ingedients: updatedIngredients,
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: 
                    state.ingredients.filter((ingredient, ingredientIndex) => {
                        return ingredientIndex !== state.editedIngredientIndex; // return all elements without the one we want to delete (their indexes will be equal)
                    }),
                    editedIngredientIndex: -1,
                    editedIngredient: null
            };
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: { ...state.ingredients[action.payload] }
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        default:
            return state;
    }
}