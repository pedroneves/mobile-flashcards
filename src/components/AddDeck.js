import * as API from '../api';
import Colors from '../colors';
import React, { Component } from 'react';
import { Keyboard, View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

class AddDeck extends Component {
	constructor (props) {
		super(props);

		this.state = {
			deckTitle: ''
		}
	}

	createDeck = () => {
		Keyboard.dismiss();
		const deckId = 'some-id';
		const deckTitle = this.state.deckTitle;
		this.props.navigation.push('Deck', { deckId, deckTitle })
	}

	render () {
		return (
			<View style={styles.container}>
				<View style={styles.textInputContainer}>
					<TextInput
						style={styles.textInput}
						placeholder="Type the deck title here"
						onChangeText={(deckTitle) => this.setState({deckTitle})}
					/>
				</View>

				<View>
					<TouchableOpacity style={[styles.touch, styles.touchBlack]} onPress={this.createDeck}>
						<Text style={styles.text}>Submit</Text>
					</TouchableOpacity>
				</View>
			</View>
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
	},
	touch: {
		padding: 30,
		borderRadius: 10
	},
	touchBlack: {
		backgroundColor: Colors.black,
	},
	text: {
		fontSize: 20,
		color: Colors.white,
	}
})

export default AddDeck;