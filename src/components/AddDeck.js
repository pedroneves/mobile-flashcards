import * as API from '../api';
import Colors from '../colors';
import Styles from '../styles';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
	startSavingDeck,
	successfullySavedDeck,
	failedSaveDeck,
	setDecks
 } from '../actions';
import {
	Keyboard,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	KeyboardAvoidingView
} from 'react-native';

class AddDeck extends Component {
	constructor (props) {
		super(props);

		this.state = {
			deckTitle: ''
		}
	}

	createDeck = () => {
		const { dispatch } = this.props;

		dispatch(startSavingDeck())

		Keyboard.dismiss();

		const deckTitle = this.state.deckTitle;

		API.saveDeckTitle(deckTitle)
			.then(id => {
				return API.getDecks()
					.then((allDecks) => {
						dispatch(setDecks(allDecks))
						return id
					})
			})
			.then(id => {
				dispatch(successfullySavedDeck())

				const deckId = id;
				this.props.navigation.push('Deck', { deckId, deckTitle });
				this.setState({ deckTitle: '' });
			})
			.catch(error => {
				dispatch(failedSaveDeck(error))
			})
	}

	render () {
		const { touch, touchBlack, touchText, touchTextWhite } = Styles;
		const submitTouchStyles = [touch, touchBlack]
		const submitTouchTextStyles = [touchText, touchTextWhite]

		return (
			<KeyboardAvoidingView style={styles.container}  behavior="padding" enabled>
				<View style={styles.textInputContainer}>
					<TextInput
						style={styles.textInput}
						placeholder="Type the deck title here"
						value={this.state.deckTitle}
						onChangeText={(deckTitle) => this.setState({deckTitle})}
					/>
				</View>

				<View>
					<TouchableOpacity style={submitTouchStyles} onPress={this.createDeck}>
						<Text style={submitTouchTextStyles}>Submit</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textInputContainer: {
		padding: 5,
		borderBottomWidth: 1,
		borderColor: Colors.black,
		marginBottom: 50
	},
	textInput: {
		fontSize: 25
	}
})

export default connect()(AddDeck);