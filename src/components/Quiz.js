import Colors from '../colors';
import Styles from '../styles';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as Notifications from '../notifications';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

class Quiz extends Component {
	constructor (props) {
		super(props);

		this.state = {
			current: 1,
			score: 0,
			isShowingQuestion: true,
		}
	}

	componentDidMount () {
		Notifications.resetStudyReminderNotifications();
	}

	reset = () => {
		this.setState({
			current: 1,
			score: 0,
			isShowingQuestion: true,
		})
	}

	answer = (isCorrect) => {
		this.setState(state => {
			const score = state.score + (isCorrect ? 1 : 0);
			const current = state.current + 1;
			const isShowingQuestion = true;

			return { score, current, isShowingQuestion };
		})
	}

	toggleCardOption = () => {
		this.setState(state => {
			const isShowingQuestion = !state.isShowingQuestion;
			return { isShowingQuestion }
		})
	}

	renderQuestions (quiz, current, total) {
		const {
			touch, touchGreen, touchBrightRed, touchText,
			touchTextWhite, mb20, mb10, mr10, ml10,
		} = Styles;

		const correctTouchStyles = [touch, touchGreen, mb20, ml10, mr10];
		const correctTouchTextStyles = [touchText, touchTextWhite];
		const incorrectTouchStyles = [touch, touchBrightRed, mb10, ml10, mr10];
		const incorrectTouchTextStyles = [touchText, touchTextWhite];

		const cardText = this.state.isShowingQuestion ? quiz.question : quiz.answer;
		const cardOption = this.state.isShowingQuestion ? 'Show Answer' : 'Show Question';

		return (
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.questionAmountContainer}>
					<Text style={styles.questionAmount}>{current} / {total}</Text>
				</View>

				<View style={[styles.card, styles.shadow]}>
					<Text style={styles.cardText}>{cardText}</Text>

					<TouchableOpacity onPress={this.toggleCardOption}>
						<Text style={styles.cardOptionText}>{cardOption}</Text>
					</TouchableOpacity>
				</View>

				<View style={{paddingVertical: 10, paddingHorizontal: 40}}>
					<TouchableOpacity
						style={correctTouchStyles}
						onPress={() => this.answer(true)}
					>
						<Text style={correctTouchTextStyles}>Correct</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={incorrectTouchStyles}
						onPress={() => this.answer(false)}
					>
						<Text style={incorrectTouchTextStyles}>Incorrect</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		)
	}

	renderScore (score, total) {
		const {
			touch, touchWhite, touchBlack, touchText,
			touchTextWhite, touchTextBlack, mb20, mb10, mr10, ml10,
		} = Styles;

		const redoTouchStyles = [touch, touchWhite, mb20, ml10, mr10];
		const redoTouchTextStyles = [touchText, touchTextBlack];
		const backTouchStyles = [touch, touchBlack, mb10, ml10, mr10];
		const backTouchTextStyles = [touchText, touchTextWhite];

		return (
			<View style={Styles.containerMiddle}>
				<Text style={Styles.textMedium}>You scored</Text>
				<Text style={Styles.textBig}>{score} of {total}</Text>

				<View style={{paddingVertical: 20, paddingHorizontal: 40}}>
					<TouchableOpacity
						style={redoTouchStyles}
						onPress={this.reset}
					>
						<Text style={redoTouchTextStyles}>Restart Quiz</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={backTouchStyles}
						onPress={() => this.props.navigation.goBack()}
					>
						<Text style={backTouchTextStyles}>Back to Deck</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}

	render () {
		const id = this.props.navigation.state.params.deckId;
		const deck = this.props.decks[id];
		const { questions } = deck;
		const total = questions.length;

		if (this.state.current > total) {
			return this.renderScore(this.state.score, total)
		}

		const quiz = questions[this.state.current - 1];

		return this.renderQuestions(quiz, this.state.current, total)
	}
}

Quiz.navigationOptions = function ({ navigation }) {
	return {
		title: 'Quiz',
		headerTintColor: Colors.white,
		headerStyle: {
			backgroundColor: Colors.black,
		}
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'flex-start',
		alignItems: 'stretch',
	},
	card: {
		marginRight: 10,
		marginLeft: 10,
		marginBottom: 10,
		padding: 10,
		paddingTop: 50,
		paddingBottom: 50,
		backgroundColor: Colors.white,
		justifyContent: 'center',
		alignItems: 'stretch',
		borderWidth: 1,
		borderColor: Colors.gray,
		borderRadius: 5,
	},
	shadow: {
		shadowColor: 'rgba(0, 0, 0, 0.25)',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowRadius: 6,
		shadowOpacity: 1,
	},
	cardText: {
		fontSize: 50,
		textAlign: 'center',
		color: Colors.black,
		marginTop: 10,
		marginBottom: 30,
	},
	cardOptionText: {
		fontSize: 20,
		textAlign: 'center',
		color: '#CC0000',
		marginTop: 10,
		marginBottom: 10,
	},
	questionAmountContainer: {
		padding: 10,
		justifyContent: 'center'
	},
	questionAmount: {
		fontSize: 20,
		textAlign: 'left',
	}
})

function mapStateToProps (state) {
	return {
		decks: state.byId
	}
}

export default connect(mapStateToProps)(Quiz);