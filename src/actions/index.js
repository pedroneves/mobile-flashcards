export const LOAD_DECKS_START = 'LOAD_DECKS_START';
export const LOAD_DECKS_SUCCESS = 'LOAD_DECKS_SUCCESS';
export const LOAD_DECKS_FAIL = 'LOAD_DECKS_FAIL';
export const SET_DECKS = 'SET_DECKS';

export function startLoadingDecks () {
	console.log('startLoadingDecks fired')
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

export function setDecks (decks) {
	return {
		type: SET_DECKS,
		decks
	}
}