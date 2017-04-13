import * as CA from '../actions/characters-actions';

const initialState = {
	isFetching: false,
	didInvalidate: false,
	characters: [],
	character: {},
	characterCount: 0,
	skip: 0,
	take: 20
};

export default function Characters(state = initialState, action):any {
	switch (action.type) {
		case CA.CHARACTERS_REQUEST: 
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false
			});
		case CA.CHARACTERS_SUCCESS: 
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				characters: action.response.characters,
				charactersCount: action.response.count
			});
		case CA.CHARACTERS_FAILURE: 
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: true
			});
		case CA.CHARACTER_REQUEST: 
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false
			});
		case CA.CHARACTER_SUCCESS: 
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				character: action.response
			});
		case CA.CHARACTER_FAILURE: 
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: true
			});
		default:
			return state;
	}
}