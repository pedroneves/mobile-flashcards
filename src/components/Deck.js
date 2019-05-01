import Colors from '../colors';
import Styles from '../styles';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class Deck extends Component {
	addCard = () => {
		const deckId = this.props.navigation.state.params.deckId;
		this.props.navigation.navigate('AddCard', { deckId });
	}

	startQuiz = () => {
		const deckId = this.props.navigation.state.params.deckId;
		this.props.navigation.navigate('Quiz', { deckId });
	}

	renderDeckLoadFailureMessage () {
		const { deckTitle } = this.props.navigation.state.params;

		return (
			<View style={[styles.container, { justifyContent: 'center' }]}>
				<Text style={[styles.textFailure, { fontSize: 40, marginBottom: 30 }]}>Ops!</Text>
				<Text style={styles.textFailure}>Could not load "{deckTitle}"</Text>
			</View>
		)
	}

	render () {
		const id = this.props.navigation.state.params.deckId;
		const deck = this.props.decks[id];

		if (!deck) {
			return this.renderDeckLoadFailureMessage()
		}

		const total = deck.questions.length;

		const {
			touch, touchWhite, touchBlack, touchText,
			touchTextBlack, touchTextWhite,  mb20
		} = Styles;

		const addCardTouchStyles = [touch, touchWhite, mb20];
		const addCardTouchTextStyles = [touchText, touchTextBlack];
		const startQuizTouchStyles = [touch, touchBlack];
		const startQuizTouchTextStyles = [touchText, touchTextWhite];

		return (
			<View style={styles.container}>
				<View>
					<Text style={styles.title}>{deck.title}</Text>
					<Text style={styles.cards}>{total} card{total != 1 ? 's' : ''}</Text>
				</View>

				<View>
					<TouchableOpacity style={addCardTouchStyles}>
						<Text style={addCardTouchTextStyles}>Add Card</Text>
					</TouchableOpacity>

					<TouchableOpacity style={startQuizTouchStyles}>
						<Text style={startQuizTouchTextStyles}>Start Quiz</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

Deck.navigationOptions = function ({ navigation }) {
	const { deckTitle } = navigation.state.params;

	return {
		title: deckTitle,
		headerTintColor: Colors.white,
		headerStyle: {
			backgroundColor: Colors.black,
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-evenly',
		alignItems: 'center'
	},
	title: {
		textAlign: 'center',
		fontSize: 50,
		color: Colors.black
	},
	cards: {
		textAlign: 'center',
		fontSize: 30,
		color: Colors.gray
	}
})

function mapStateToProps (state) {
	return {
		decks: state.byId
	}
}

export default connect(mapStateToProps)(Deck);