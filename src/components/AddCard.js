import * as API from '../api';
import Colors from '../colors';
import Styles from '../styles';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
	startSavingCard,
	successfullySavedCard,
	failedSaveCard,
	setDecks
 } from '../actions';
import {
	Keyboard,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView
} from 'react-native';

class AddCard extends Component {
	constructor (props) {
		super(props);

		this.state = {
			question: '',
			answer: ''
		}
	}

	addCard = () => {
		const { dispatch } = this.props;

		dispatch(startSavingCard())

		Keyboard.dismiss();

		const { question, answer } = this.state;
		const { deckId } = this.props.navigation.state.params;

		API.addCardToDeck(deckId, { question, answer })
			.then(deck => {
				this.setState({ question: '', answer: '' });
				this.props.navigation.goBack();

				return API.getDecks()
					.then((allDecks) => {
						dispatch(setDecks(allDecks))
						return deck
					})
			})
			.then(deck => {
				dispatch(successfullySavedCard())
			})
			.catch(error => {
				dispatch(failedSaveCard(error))
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
						placeholder="Type the question here"
						value={this.state.question}
						onChangeText={(question) => this.setState({question})}
					/>
				</View>

				<View style={Styles.textInputContainer}>
					<TextInput
						style={Styles.textInput}
						placeholder="Type the answer here"
						value={this.state.answer}
						onChangeText={(answer) => this.setState({answer})}
					/>
				</View>

				<View>
					<TouchableOpacity style={submitTouchStyles} onPress={this.addCard}>
						<Text style={submitTouchTextStyles}>Submit</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

AddCard.navigationOptions = function ({ navigation }) {
	const { deckTitle } = navigation.state.params;

	return {
		title: `Add card to deck "${deckTitle}"`,
		headerTintColor: Colors.white,
		headerStyle: {
			backgroundColor: Colors.black,
		}
	}
}

export default connect()(AddCard);