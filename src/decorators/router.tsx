// import { Router } from 'react-router';
import * as ReactRouter from 'react-router';
import * as React from 'react';

export function Router(target: any) {
	target.contextTypes = target.contextTypes || {};
	target.contextTypes.router = React.PropTypes.shape({
    	replace: React.PropTypes.func.isRequired
  	}).isRequired
}

export interface IRouterContext {
	router: ReactRouter.Router
}

export interface IRouter {
	replaceWith(path: string)
}