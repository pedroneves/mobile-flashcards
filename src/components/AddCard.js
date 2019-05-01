import Colors from '../colors';
import Styles from '../styles';
import React, { Component } from 'react';
import { Keyboard, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

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
					<TouchableOpacity style={submitTouchStyles} onPress={this.createCard}>
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
		title: `Add card to ${deckTitle}`,
		headerTintColor: Colors.white,
		headerStyle: {
			backgroundColor: Colors.black,
		}
	}
}

export default AddCard;