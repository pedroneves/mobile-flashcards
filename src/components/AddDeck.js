import React, { Component } from 'react';
import { Keyboard, View, Text, TextInput, TouchableOpacity } from 'react-native';

class AddDeck extends Component {
	constructor (props) {
		super(props);

		this.state = {
			deckTitle: ''
		}
	}

	createDeck = () => {
		Keyboard.dismiss();
		this.props.navigation.push('Deck', { deckTitle: this.state.deckTitle })
	}

	render () {
		return (
			<View>
				<Text>AddDeck view</Text>
				<TextInput
					placeholder="Type the deck name here"
					onChangeText={(deckTitle) => this.setState({deckTitle})}
				/>
				<TouchableOpacity onPress={this.createDeck}>
					<Text>Submit</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

export default AddDeck;