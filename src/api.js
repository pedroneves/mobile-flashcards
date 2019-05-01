import { AsyncStorage } from "react-native";

const DECKS_STORAGE_KEY = 'MobileFlash:decks';

export function getDecks () {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then((data) => {
			data = JSON.parse(data)
			return data;
		})
};

export function getDeck () {};

export function saveDeckTitle () {};

export function addCardToDeck () {};

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
