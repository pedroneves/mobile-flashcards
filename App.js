import React from 'react';
import Colors from './src/colors';
import { View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import { StackNavigator, TabNavigator } from "react-navigation";

import Deck from './src/components/Deck';
import Quiz from './src/components/Quiz';
import TopBar from './src/components/TopBar';
import AddCard from './src/components/AddCard';
import AddDeck from './src/components/AddDeck';
import DeckList from './src/components/DeckList';

import reducers from './src/reducers';

const Tabs = TabNavigator({
	DeckList: {
		screen: DeckList,
		navigationOptions: {
			tabBarLabel: 'Decks',
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
}, {
	tabBarOptions: {
		activeTintColor: Colors.white,
		style: {
			height: 56,
			backgroundColor: Colors.black,
			shadowColor: 'rgba(0, 0, 0, 0.24)',
			shadowOffset: {
				width: 0,
				height: 5
			},
			shadowRadius: 6,
			shadowOpacity: 1
		}
	}
})

const MainStack = StackNavigator({
	Home: {
		screen: Tabs,
		navigationOptions: {
			header: null
		}
	},
	AddCard: { screen: AddCard },
	Deck: { screen: Deck },
	Quiz: { screen: Quiz }
})

const store = createStore(reducers);

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<View style={{ flex: 1 }}>
					<TopBar backgroundColor={Colors.black} barStyle="light-content" />
					<MainStack />
				</View>
			</Provider>
		);
	}
}

export default App;