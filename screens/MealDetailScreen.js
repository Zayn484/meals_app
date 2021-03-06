import React from 'react';
import { View, Text, Button, ScrollView, Image, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/actions/meals';
import CustomHeaderButton from '../components/HeaderButton';

const ListItem = (props) => (
	<View style={styles.listItem}>
		<Text>{props.children}</Text>
	</View>
);

const MealDetailScreen = (props) => {
	const availableMeals = useSelector((state) => state.meals.meals);
	const mealId = props.navigation.getParam('mealId');
	const currentMealsIsFavorite = useSelector((state) => state.meals.favoriteMeals.some((meal) => meal.id === mealId));

	const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

	const dispatch = useDispatch();

	const toggleFavoriteHandler = React.useCallback(
		() => {
			dispatch(toggleFavorite(mealId));
		},
		[ dispatch, mealId ]
	);

	React.useEffect(
		() => {
			props.navigation.setParams({
				toggleFav: toggleFavoriteHandler
			});
		},
		[ toggleFavoriteHandler ]
	);

	React.useEffect(
		() => {
			props.navigation.setParams({
				isFav: currentMealsIsFavorite
			});
		},
		[ currentMealsIsFavorite ]
	);

	return (
		<ScrollView>
			<Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
			<View style={styles.details}>
				<Text>{selectedMeal.duration}m</Text>
				<Text>{selectedMeal.complexity.toUpperCase()}</Text>
				<Text>{selectedMeal.affordability.toUpperCase()}</Text>
			</View>
			<Text style={styles.title}>Ingredients</Text>
			{selectedMeal.ingredients.map((ing, index) => <ListItem key={index}>{ing}</ListItem>)}
			<Text style={styles.title}>Steps</Text>
			{selectedMeal.steps.map((step, index) => <ListItem key={index}>{step}</ListItem>)}
			<View style={styles.screen}>
				<Button
					title="Go Back to Categories"
					onPress={() => {
						props.navigation.popToTop();
					}}
				/>
			</View>
		</ScrollView>
	);
};

MealDetailScreen.navigationOptions = (navigationData) => {
	const mealTitle = navigationData.navigation.getParam('mealTitle');
	const toggleFavoriteHandler = navigationData.navigation.getParam('toggleFav');
	const isFavorite = navigationData.navigation.getParam('isFav');

	return {
		headerTitle: mealTitle,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Favorite"
					iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
					onPress={toggleFavoriteHandler}
				/>
			</HeaderButtons>
		)
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	image: {
		width: '100%',
		height: 200
	},
	details: {
		flexDirection: 'row',
		padding: 15,
		justifyContent: 'space-around'
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 22,
		textAlign: 'center'
	},
	listItem: {
		marginVertical: 10,
		marginHorizontal: 20,
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 10
	}
});

export default MealDetailScreen;
