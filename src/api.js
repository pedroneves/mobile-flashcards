import Utils from './utils';
import { AsyncStorage } from "react-native";

const DECKS_STORAGE_KEY = 'MobileFlash:decks';

export function getDecks () {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then((data) => {
			data = JSON.parse(data)
			return data;
		})
};

export function getDeck (id) {
	return getDecks()
		.then(decks => {
			return decks[id]
		})
};

export function saveDeckTitle (title) {
	const id = Utils.generateUID();
	const questions = [];
	const deck = { title, questions };

	return saveDeck(id, deck);
};

export function addCardToDeck (id, card) {
	return getDeck(id)
		.then(deck => {
			deck.questions.push(card)
			return saveDeck(id, deck)
		})
};

function saveDeck (id, deck) {
	const entry = { [id]: deck };

	return AsyncStorage
		.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(entry))
		.then(() => deck);
}

// Initial data
const initData = {
	React: {
		title: 'React',
		questions: [
			{
				question: 'What is React?',
				answer: 'A library for managing user interfaces'
			},
			{
				question: 'Where do you make Ajax requests in React?',
				answer: 'The componentDidMount lifecycle event'
			}
		]
	},
	JavaScript: {
		title: 'JavaScript',
		questions: [
			{
				question: 'What is a closure?',
				answer: 'The combination of a function and the lexical environment within which that function was declared.'
			}
		]
	}
}

function apiInit () {
	AsyncStorage
		.getItem(DECKS_STORAGE_KEY)
		.then(data => {
			if (data === null) {
				return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(initData))
			}
			return data;
		})
}

apiInit()
