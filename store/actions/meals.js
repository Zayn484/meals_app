import { TOGGLE_FAVORITE, SET_FILTERS } from './types';

export const toggleFavorite = (id) => ({
	type: TOGGLE_FAVORITE,
	mealId: id
});

export const setFilters = (filterSettings) => ({
	type: SET_FILTERS,
	filters: filterSettings
});
