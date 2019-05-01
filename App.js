import React from 'react';
import { View } from 'react-native';
import { StackNavigator, TabNavigator } from "react-navigation";

import Deck from './src/components/Deck';
import TopBar from './src/components/TopBar';
import AddCard from './src/components/AddCard';
import AddDeck from './src/components/AddDeck';
import DeckList from './src/components/DeckList';

const Tabs = TabNavigator({
	DeckList: {
		screen: DeckList,
		navigationOptions: {
			tabBarLabel: 'Deck List',
			tabBarIcon: ({ tintColor }) => <Entypo name='plus' size={30} color={tintColor} />
		},
	},
	AddDeck: {
		screen: AddDeck,
		navigationOptions: {
			tabBarLabel: 'New Deck',
			tabBarIcon: ({ tintColor }) => <Entypo name='plus' size={30} color={tintColor} />
		},
	},
})

const MainStack = StackNavigator({
	Home: {
		screen: Tabs,
		navigationOptions: {
			header: null
		}
	},
	AddCard: { screen: AddCard },
	Deck: { screen: Deck }
})

class App extends React.Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<TopBar barStyle="light-content" />
				<MainStack />
			</View>
		);
	}
}

export default App;