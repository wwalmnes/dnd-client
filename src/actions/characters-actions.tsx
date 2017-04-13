import { CALL_API } from '../middleware/api';

export const CHARACTERS_REQUEST = 'CHARACTERS_REQUEST';
export const CHARACTERS_SUCCESS = 'CHARACTERS_SUCCESS';
export const CHARACTERS_FAILURE = 'CHARACTERS_FAILURE';

export const CHARACTER_REQUEST = 'CHARACTER_REQUEST';
export const CHARACTER_SUCCESS = 'CHARACTER_SUCCESS';
export const CHARACTER_FAILURE = 'CHARACTER_FAILURE';

function fetchCharacters(query, skip, limit) {
	return {
		[CALL_API]: {
			endpoint: `characters?skip=${skip}&limit=${limit}`,
			authenticated: true,
			types: [CHARACTERS_REQUEST, CHARACTERS_SUCCESS, CHARACTERS_FAILURE]
		}
	};
}

function shouldFetchCharacters() {

}

export function fetchCharactersIfNeeded(query, skip, limit) {
	return (dispatch, getState) => {
		return dispatch(fetchCharacters(query, skip, limit));
	};
}

function fetchCharacter(id) {
	return {
		[CALL_API]: {
			endpoint: `characters/${id}`,
			authenticated: true,
			types: [CHARACTER_REQUEST, CHARACTER_SUCCESS, CHARACTER_FAILURE]
		}
	};
}

function shouldFetchCharacter(state, id) {
	// TODO: Cache if request is to same resource as stored.
	return true;
}

export function fetchCharacterIfNeeded(id) {
	return (dispatch, getState) => {
		if (shouldFetchCharacter(getState(), id)) {
			return dispatch(fetchCharacter(id));
		}
	}
}