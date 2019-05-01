export const LOAD_DECKS_START = 'LOAD_DECKS_START';
export const LOAD_DECKS_SUCCESS = 'LOAD_DECKS_SUCCESS';
export const LOAD_DECKS_FAIL = 'LOAD_DECKS_FAIL';
export const SAVE_DECK_START = 'SAVE_DECK_START';
export const SAVE_DECK_SUCCESS = 'SAVE_DECK_SUCCESS';
export const SAVE_DECK_FAIL = 'SAVE_DECK_FAIL';
export const SAVE_CARD_START = 'SAVE_CARD_START';
export const SAVE_CARD_SUCCESS = 'SAVE_CARD_SUCCESS';
export const SAVE_CARD_FAIL = 'SAVE_CARD_FAIL';
export const SET_DECKS = 'SET_DECKS';

export function startLoadingDecks () {
	return { type: LOAD_DECKS_START }
}

export function successfullyLoadedDecks () {
	return { type: LOAD_DECKS_SUCCESS }
}

export function failedLoadedDecks (error) {
	return {
		type: LOAD_DECKS_FAIL,
		error
	}
}

export function startSavingDeck () {
	return { type: SAVE_DECK_START }
}

export function successfullySavedDeck () {
	return { type: SAVE_DECK_SUCCESS }
}

export function failedSaveDeck (error) {
	return {
		type: SAVE_DECK_FAIL,
		error
	}
}

export function startSavingCard () {
	return { type: SAVE_CARD_START }
}

export function successfullySavedCard () {
	return { type: SAVE_CARD_SUCCESS }
}

export function failedSaveCard (error) {
	return {
		type: SAVE_CARD_FAIL,
		error
	}
}

export function setDecks (decks) {
	return {
		type: SET_DECKS,
		decks
	}
}