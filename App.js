import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import MealsNavigator from './navigation/MealsNavigator';
import { enableScreens } from 'react-native-screens';

enableScreens();

const fetchFonts = () => {
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
	});
};

export default class App extends React.Component {
	state = {
		fontLoaded: false
	};

	render() {
		const { fontLoaded } = this.state;

		if (!fontLoaded) {
			return <AppLoading startAsync={fetchFonts} onFinish={() => this.setState({ fontLoaded: true })} />;
		}
		return <MealsNavigator />;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
