import * as LA from '../actions/login-actions';

const initialState = {
	isFetching: false,
	isAuthenticated: false,
	user: {},
	message: ''
};

export default function Auth(state = initialState, action):any {
	switch (action.type) {
		case LA.LOGIN_REQUEST:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				isAuthenticated: action.isAuthenticated,
				user: action.creds
			});
		case LA.LOGIN_SUCCESS:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				isAuthenticated: action.isAuthenticated,
				errorMessage: ''
			});
		case LA.LOGIN_FAILURE:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				isAuthenticated: action.isAuthenticated,
				errorMessage: action.message
			});
		default:
			return state;
	}
}