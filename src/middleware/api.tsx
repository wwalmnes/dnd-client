
const BASE_URL = 'http://localhost:3000/api/';
declare var $;
function callApi(endpoint, authenticated) {
	let token = localStorage.getItem('id_token') || null;
	let config:any = {};
	let headers = new Headers();
	
	if (authenticated) {
		if (token) {
			console.log('headers append: ');
			headers.append('Authorization', token);
			config = {
				headers: {
					'authorization': token, //document.cookie.substring(13)
				},
				credentials: 'same-origin' // 'same-origin'
			};
		} else {
			//throw 'No token saved';
		}
	}

	//console.log('Setting headers: ', authenticated, token, config.headers.has('Authorization'));
	console.log('values: ', config);
	/*return $.ajax({
		type: "GET",
		"crossDomain": true,
		url: BASE_URL + endpoint,
		dataType: 'json',
		async: false,
		headers: {
			"authorization": token,
			"cache-control": "no-cache",
		},
		success: function (data){
			console.log('data: ', data);
			return data;
		}
	});*/
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