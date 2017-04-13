import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router';
import * as LA from '../actions/login-actions';
import { Router, IRouterContext } from '../decorators/router';

//@Router
class Login extends React.Component<any, any> {

	constructor(props) {
		super(props);
		this.state = { spells: null, currentPage: 0, searchQuery: '' };
	}

	refs: {
		[string: string]: any,
		email: any,
		password: any
	}

	/*context: IRouterContext

	static context = {
        router: React.PropTypes.shape({
			replace: React.PropTypes.func.isRequired
		}).isRequired
    }*/

	handleClick(event) {
		const email = this.refs.email;
		const password = this.refs.password;
		const creds = { email: email.value.trim(), password: password.value.trim() }
		this.props.loginUser(creds)
	}

	componentWillReceiveProps(nextProps) {
		//console.log('isAuthenticated: ', this.props.isAuthenticated, nextProps.isAuthenticated);
		if (!this.props.isAuthenticated && nextProps.isAuthenticated) {
			//console.log('PROPS: ', this.props, this.context);
			this.props.router.replace('/characters');
		}
	}

	render() {
		return (
			<section className="page-container">
				<header style={{ backgroundImage: 'url(/public/images/landscapes/landscape3.png)' }}>
					<h2>Login</h2>
					<div className="page-header-filter"></div>
				</header>



				<div className="spells-container">
					<form action="http://localhost:3000/users/authenticate" method="post">
					</form>
					<div>
						<label>Email: </label>
						<input ref="email" type="text" name="email"/><br/>
					</div>
					<div>
						<label>Password: </label>
						<input ref="password" type="password" name="password"/>
					</div>
					<div>
						<input type="submit" value="Submit"/>
					</div>
					<div>
						<button onClick={(event) => this.handleClick(event) } className="btn btn-primary">
							Login
						</button>
					</div>
				</div>

			</section>
		);
	}
};

const mapStateToProps = (state) => {
	const authState = state !== undefined ? state.auth : {};
	const {
		isFetching,
		isAuthenticated,
		auth
	} = authState;

	return {
		isFetching,
		isAuthenticated,
		auth
	};
};

export default connect(mapStateToProps, { loginUser: LA.loginUser })(Login);