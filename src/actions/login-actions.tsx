export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function requestLogin(creds) {
	return {
		type: LOGIN_REQUEST,
		isFetching: true,
		isAuthenticated: false,
		creds
	};
}

function loginSuccess(user) {
	return {
		type: LOGIN_SUCCESS,
		isFetching: false,
		isAuthenticated: true,
		id_token: user.id_token
	};
}

function loginFailure(message) {
	return {
		type: LOGIN_FAILURE,
		isFetching: false,
		isAuthenticated: false,
		message
	};
}

export function loginUser(creds) {
	let headers = new Headers();
	headers.set('Content-Type', 'application/x-www-form-urlencoded');
	let config = {
		method: 'POST',
		headers: headers,
		body: `email=${creds.email}&password=${creds.password}`
	};

	return (dispatch) => {
		dispatch(requestLogin(creds));

		return fetch('http://localhost:3000/users/authenticate', config).then((response) => {
			return response.json();
		}).then((authentication:any) => {
			if (authentication.success) {
				document.cookie = 'access_token=' + authentication.token;
				localStorage.setItem('id_token', authentication.token);
				dispatch(loginSuccess({}));
			} else {
				dispatch(loginFailure(authentication.message));
			}
		}).catch((error) => {
			console.log('Error: ', error);
		});
	}
}

function requestLogout() {
	return {
		type: LOGOUT_REQUEST,
		isFetching: true,
		isAuthenticated: true
	};
}

function receiveLogout() {
	return {
		type: LOGOUT_SUCCESS,
		isFetching: false,
		isAuthenticated: false
	};
}

export function logoutUser() {
	return dispatch => {
		dispatch(requestLogout());
		localStorage.removeItem('id_token');
		dispatch(receiveLogout());
	}
} 