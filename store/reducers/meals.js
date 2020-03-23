import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/types';
import { MEALS } from '../../data/dummy-data';

const initialState = {
	meals: MEALS,
	filteredMeals: MEALS,
	favoriteMeals: []
};

const mealsReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_FAVORITE:
			const exisitingIndex = state.favoriteMeals.findIndex((meal) => meal.id === action.mealId);
			if (exisitingIndex >= 0) {
				const updatedFavMeals = [ ...state.favoriteMeals ];
				updatedFavMeals.splice(exisitingIndex, 1);

				return {
					...state,
					favoriteMeals: updatedFavMeals
				};
			} else {
				return {
					...state,
					favoriteMeals: state.favoriteMeals.concat(state.meals.find((meal) => meal.id === action.mealId))
				};
			}
		case SET_FILTERS:
			const appliedFilters = action.filters;
			const filteredMeals = state.meals.filter((meal) => {
				if (appliedFilters.glutenFree && !meal.isGlutenFree) {
					return false;
				}
				if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
					return false;
				}
				if (appliedFilters.vegetarian && !meal.isVegetarian) {
					return false;
				}
				if (appliedFilters.vegan && !meal.isVegan) {
					return false;
				}
				return true;
			});
			return {
				...state,
				filteredMeals: filteredMeals
			};

		default:
			return state;
	}
};

export default mealsReducer;
