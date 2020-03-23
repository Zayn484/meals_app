import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/meals';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import colors from '../constants/colors';

const FilterSwitch = (props) => (
	<View style={styles.filterContainer}>
		<Text>{props.label}</Text>
		<Switch
			trackColor={{ true: colors.primaryColor }}
			thumbColor={Platform.OS === 'android' ? colors.primaryColor : ''}
			value={props.state}
			onValueChange={props.onChange}
		/>
	</View>
);

export default function FiltersScreen(props) {
	const { navigation } = props;

	const [ isGlutinFree, setGlutinFree ] = React.useState(false);
	const [ isLactoseFree, setLactoseFree ] = React.useState(false);
	const [ isVeganFree, setVeganFree ] = React.useState(false);
	const [ isVegetatianFree, setVegetarianFree ] = React.useState(false);
	const dispatch = useDispatch();

	const saveFilters = useCallback(
		() => {
			const appliedFilters = {
				glutenFree: isGlutinFree,
				lactoseFree: isLactoseFree,
				vegan: isVeganFree,
				vegeratian: isVegetatianFree
			};
			dispatch(setFilters(appliedFilters));
		},
		[ isGlutinFree, isLactoseFree, isVeganFree, isVegetatianFree, dispatch ]
	);

	useEffect(
		() => {
			navigation.setParams({
				save: saveFilters
			});
		},
		[ saveFilters ]
	);

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Available Filters / Restrictions</Text>
			<FilterSwitch label="Gluten-free" state={isGlutinFree} onChange={(v) => setGlutinFree(v)} />
			<FilterSwitch label="Lactos-free" state={isLactoseFree} onChange={(v) => setLactoseFree(v)} />
			<FilterSwitch label="Vegan" state={isVeganFree} onChange={(v) => setVeganFree(v)} />
			<FilterSwitch label="Vegetarian" state={isVegetatianFree} onChange={(v) => setVegetarianFree(v)} />
		</View>
	);
}

FiltersScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'Filter Meals',
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item title="Menu" iconName="ios-menu" onPress={() => navData.navigation.toggleDrawer()} />
			</HeaderButtons>
		),
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item title="Save" iconName="ios-save" onPress={navData.navigation.getParam('save')} />
			</HeaderButtons>
		)
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center'
	},
	filterContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '80%',
		marginVertical: 10
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 22,
		margin: 20,
		textAlign: 'center'
	}
});
