import Utils from './utils';
import { AsyncStorage } from "react-native";

let IS_INITED = false;
const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';

export async function getDecks () {
	await apiInit();
	const dataString = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
	const data = JSON.parse(dataString)
	return data
};

export async function getDeck (id) {
	await apiInit();
	const decks = await getDecks();
	return decks[id];
};

export async function saveDeckTitle (title) {
	await apiInit();
	const id = Utils.generateUID();
	const questions = [];
	const deck = { title, questions };

	await saveDeck(id, deck);

	return id;
};

export async function addCardToDeck (id, card) {
	await apiInit();
	const deck = await getDeck(id);
	deck.questions.push(card);

	await saveDeck(id, deck);

	return deck;
};

async function saveDeck (id, deck) {
	const entry = { [id]: deck };
	const entryString = JSON.stringify(entry);
	await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, entryString);
	return deck;
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

async function apiInit () {
	if (IS_INITED) {
		return;
	}

	const data = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

	if (data === null) {
		const initDataString = JSON.stringify(initData)
		await AsyncStorage.setItem(DECKS_STORAGE_KEY, initDataString)
	}

	return data;
}