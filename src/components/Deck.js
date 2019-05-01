import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class Deck extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: props.navigation.state.params.deckId
		}
	}

	addCard = () => {
		this.props.navigation.navigate('AddCard', { deckId: this.state.id});
	}

	startQuiz = () => {
		this.props.navigation.navigate('Quiz', { deckId: this.state.id });
	}

	render () {
		return (
			<View>
				<Text>Deck view</Text>

				<TouchableOpacity>
					<Text>Add Card</Text>
				</TouchableOpacity>

				<TouchableOpacity>
					<Text>Start Quiz</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

export default Deck;