import React from 'react';
import { FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';
import CustomHeaderButton from '../components/HeaderButton';

export default function CategoriesScreen(props) {
	const renderGridItem = (itemData) => {
		return (
			<CategoryGridTile
				title={itemData.item.title}
				color={itemData.item.color}
				onSelect={() => {
					props.navigation.navigate({
						routeName: 'CategoriesMeals',
						params: {
							categoryId: itemData.item.id
						}
					});
				}}
			/>
		);
	};

	return <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />;
}

CategoriesScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'Meal Categories',
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item title="Menu" iconName="ios-menu" onPress={() => navData.navigation.toggleDrawer()} />
			</HeaderButtons>
		)
	};
};
