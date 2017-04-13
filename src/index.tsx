import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Link, browserHistory, withRouter } from 'react-router';
// import Router from './routes';
import DevTools from './containers/devtools';
import Header from './components/header/header';
import Characters from './templates/characters';
import Character from './templates/charactersheet';
import Spells from './components/spells/spells';
import Spell from './components/spells/spell';
import SpellCreation from './templates/spellcreation';
import SpellEdit from './templates/spelledit';
import Login from './templates/login';
// require('./site.scss');

import appStore from './store/app-store';
// Should do a check to see if token is still valid.
let token = localStorage.getItem('id_token') || null;

const store = appStore({
	characters: {
		isFetching: false,
		didInvalidate: false,
		characters: [],
		character: {},
		charactersCount: 0,
		skip: 0,
		take: 20
	},
	spells: {
		isFetching: false,
		didInvalidate: false,
		spells: [],
		spell: {},
		spellsCount: 0
	},
	skills: {
		isFetching: false,
		didInvalidate: false,
		skill: {},
		skillCount: 0,
		query: '',
		skip: 0,
		take: 20
	},
	auth: {
		isFetching: false,
		isAuthenticated: token ? true : false,
		user: {},
		message: ''
	}
});

const Container = ({children}) => {
	return (
		<div>
			<Header />
			<div className="main">
				{children}
			</div>
		</div>
	);
}

const isAuthenticated = (nextState, replace) => {	
	let currentState = store.getState();
	console.log('Checking authentication: ', nextState, replace, currentState);
	if (!currentState.auth.isAuthenticated) {
		replace({
			pathname: '/login',
			state: { nextPathname: nextState.location.pathname }
		});
	}
};


ReactDom.render(
	<Provider store={store}>
		<div>
			<Router history={browserHistory}>
				<Route path="/" component={Container}>
					<Route path="/characters" component={Characters} onEnter={isAuthenticated} />
					<Route path="/character/:id" component={Character} />
					<Route path="/spells" component={Spells} />
					<Route path="/spells/create" component={SpellCreation} />
					<Route path="/spell/:id/edit" component={SpellEdit} />
					<Route path="/spell/:id" component={Spell} />
					<Route path="/login" component={withRouter(Login)}  />
				</Route>
			</Router>
			<DevTools />
		</div>
	</Provider>,
	document.getElementById('root')
);