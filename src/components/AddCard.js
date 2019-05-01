import React, { Component } from 'react';
import { Keyboard, View, Text, TextInput, TouchableOpacity } from 'react-native';

class AddCard extends Component {
	constructor (props) {
		super(props);

		this.state = {
			question: '',
			answer: ''
		}
	}

	createCard = () => {
		Keyboard.dismiss();
		this.props.navigation.goBack()
	}

	render () {
		return (
			<View>
				<Text>AddCard for Deck </Text>
				<TextInput
					placeholder="Type the question here"
					onChangeText={(question) => this.setState({question})}
				/>
				<TextInput
					placeholder="Type the answer here"
					onChangeText={(answer) => this.setState({answer})}
				/>
				<TouchableOpacity onPress={this.createCard}>
					<Text>Submit</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

AddCard.navigationOptions = function ({ navigation }) {
	const { deckName } = navigation.state.params;

	return {
		title: `Add Card for ${deckName}`
	}
}

export default AddCard;