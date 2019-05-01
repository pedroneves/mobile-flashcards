import * as API from '../api';
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
	Alert,
	Keyboard,
	View,
	Text,
	TextInput,
	TouchableOpacity,
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

		if (deckTitle.length === 0) {
			Alert.alert('Invalid Title', 'Type something for the Deck title...');
			return;
		}

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
			<KeyboardAvoidingView style={Styles.containerMiddle} behavior="padding" enabled>
				<View style={Styles.textInputContainer}>
					<TextInput
						style={Styles.textInput}
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

export default connect()(AddDeck);