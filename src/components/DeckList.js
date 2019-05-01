import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const dummyData = {
	React: {
		title: 'React',
		questions: [
			{
				question: 'What is React?',
				answer: 'A library for managing user interfaces'
			},
			{
				question: 'Where do you make Ajax requests in React?',
				answer: 'The componentDidMount lifecycle event'
			}
		]
	},
	JavaScript: {
		title: 'JavaScript',
		questions: [
			{
				question: 'What is a closure?',
				answer: 'The combination of a function and the lexical environment within which that function was declared.'
			}
		]
	}
}

class DeckList extends Component {
	renderDeck (id) {
		const deck = dummyData[id];
		const { navigate } = this.props.navigation;
		return (
			<TouchableOpacity onPress={() => navigate('Deck', { deckId: id })}>
				<Text>{deck.title}</Text>
				<Text>{deck.questions.length} Cards</Text>
			</TouchableOpacity>
		);
	}

	render () {
		const deckIds = Object.keys(dummyData);

		return (
			<View>
				{
					deckIds.map(id => {
						return <View key={id}>{this.renderDeck(id)}</View>
					})
				}
			</View>
		)
	}
}

export default DeckList;