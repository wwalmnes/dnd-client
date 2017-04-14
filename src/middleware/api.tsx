
let tmpApiRoot = null;
declare var process;
if (process.env.NODE_ENV === 'production') {
	tmpApiRoot = 'http://176.58.120.98:3000/api/';
} else {
	tmpApiRoot = 'http://localhost:3000/api/';
}

export const BASE_URL = tmpApiRoot;

function callApi(endpoint, authenticated) {
	let token = localStorage.getItem('id_token') || null;
	let config:any = {};
	let headers = new Headers();
	
	if (authenticated) {
		if (token) {
			headers.append('Authorization', token);
			config = {
				headers: {
					'authorization': token, //document.cookie.substring(13)
				},
				credentials: 'same-origin' // 'same-origin'
			};
		}
	}

	return fetch(BASE_URL + endpoint, config).then((response) => {
		return response.json().then((data) => {
			return {data, response};
		});
	}).then(({data, response}:any) => {
		if (!response.ok || response.statusText === 'Unauthorized') {
			return Promise.reject(data);
		}
		return data;
	}).catch((error) => {
		return Promise.reject(error);
	});
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {
	const callAPI = action[CALL_API];
	
	// So the middleware is not applied to every action.
	if (typeof callAPI === 'undefined') {
		return next(action);
	}
	
	let { endpoint, types, authenticated } = callAPI;
	const [ requestType, successType, errorType ] = types;
	
	next({
		type: requestType
	});

	return callApi(endpoint, authenticated).then((response) => {
		next({
			response,
			authenticated,
			type: successType
		});
	}).catch((error) => {
		next({
			error: error.message || 'There was an error.',
			type: errorType
		});
	});
}