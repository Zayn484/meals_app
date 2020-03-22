import React from 'react';
import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealList from '../components/MealList';

const CategoryMealScreen = (props) => {
	const categoryId = props.navigation.getParam('categoryId');

	const displayMeals = MEALS.filter((meal) => meal.categoryIds.indexOf(categoryId) >= 0);

	return <MealList listData={displayMeals} navigation={props.navigation} />;
};

CategoryMealScreen.navigationOptions = (navigationData) => {
	const categoryId = navigationData.navigation.getParam('categoryId');
	const selectedCategory = CATEGORIES.find((cat) => cat.id === categoryId);

	return {
		headerTitle: selectedCategory.title
	};
};

export default CategoryMealScreen;
