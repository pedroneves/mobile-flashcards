import {
	LOAD_DECKS_START,
	LOAD_DECKS_SUCCESS,
	LOAD_DECKS_FAIL,
	SET_DECKS
} from '../actions';

const INITIAL_STATE = {
	isLoading: false,
	hasLoaded: false,
	isFail: false,
	isSuccess: false,
	byId: {},
	ids: []
}

export default function reducer (state=INITIAL_STATE, action) {
	switch(action.type) {
		case SET_DECKS:
			return {
				...state,
				byId: action.decks,
				ids: Object.keys(action.decks)
			}
		case LOAD_DECKS_START:
			return {
				...state,
				isLoading: true,
				hasLoaded: false,
				isFail: false,
				isSuccess: false,
			}
		case LOAD_DECKS_SUCCESS:
			return {
				...state,
				isLoading: false,
				hasLoaded: true,
				isFail: false,
				isSuccess: true,
			}
		case LOAD_DECKS_FAIL:
			return {
				...state,
				isLoading: false,
				hasLoaded: true,
				isFail: true,
				isSuccess: false,
				error: action.error
			}
		default:
			return state
	}
}