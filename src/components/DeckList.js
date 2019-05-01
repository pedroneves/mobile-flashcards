import * as API from "../api";
import Colors from '../colors';
import { connect } from "react-redux";
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
	startLoadingDecks,
	successfullyLoadedDecks,
	failedLoadedDecks,
	setDecks
} from "../actions";

class DeckList extends Component {
	componentDidMount () {
		const { dispatch } = this.props

		dispatch(startLoadingDecks());

		API.getDecks()
			.then(decks => {
				dispatch(setDecks(decks));
				dispatch(successfullyLoadedDecks())
			})
			.catch(error => {
				dispatch(failedLoadedDecks(error))
			})
	}

	renderDeck (id) {
		const deck = this.props.decks[id];
		const deckId = id;
		const deckTitle = deck.title;
		const { navigate } = this.props.navigation;
		const total = deck.questions.length;
		return (
			<TouchableOpacity
				style={styles.container}
				onPress={() => navigate('Deck', { deckId, deckTitle })}
			>
				<Text style={styles.title}>{deck.title}</Text>
				<Text style={styles.cards}>{total} card{total != 1 ? 's' : ''}</Text>
			</TouchableOpacity>
		);
	}

	render () {
		const deckIds = this.props.deckIds;

		return (
			<View style={{ paddingTop: 30 }}>
				{
					deckIds.map(id => {
						return <View key={id}>{this.renderDeck(id)}</View>
					})
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 30,
		paddingBottom: 30,
		justifyContent: 'center'
	},
	title: {
		textAlign: 'center',
		fontSize: 30,
		color: Colors.black
	},
	cards: {
		textAlign: 'center',
		fontSize: 20,
		color: Colors.gray
	}
})

function mapStateToProps (state) {
	return {
		decks: state.byId,
		deckIds: state.ids
	}
}

export default connect(mapStateToProps, null)(DeckList);