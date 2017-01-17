import React, { Component, PropTypes } from 'react';
import css from 'bootstrap/dist/css/bootstrap.css';
import addonAPI from '@kadira/storybook-addons';
import { Comments, Login, SubmitComment } from './';
import { hasStorage } from '../utils';

export default class App extends Component {
	constructor(...args) {
		super(...args);
		this.state = {
			user: {
				isUserAuthenticated: null,
				userNickName: null,
				userEmail: null,
			},
			userComment: null,
			comments: []
		};
		this.onUserNickNameChange = ::this.onUserNickNameChange;
		this.onUserEmailChange = ::this.onUserEmailChange;
		this.onRegisterSubmit = ::this.onRegisterSubmit;
		this.verifyUser = ::this.verifyUser;
	}
	componentWillMount() {
		if (hasStorage('localStorage')) {
			this.verifyUser();
		}
	}
	verifyUser() {
		const userNickName = localStorage.getItem('blabbr_userNickName');
		const userEmail = localStorage.getItem('blabbr_userEmail');
		userNickName && userEmail && this.setState({ user: { userNickName,  userEmail, isUserAuthenticated: true }});
	}
	setUser(nickname, email) {
		const { user } = this.state;
		localStorage.setItem('blabbr_userNickName', nickname);
		localStorage.setItem('blabbr_userEmail', email);
		this.setState({ user: Object.assign(user, { isUserAuthenticated: true })});
	}
	onUserNickNameChange(e) {
		const { user } = this.state;
		this.setState({ user: Object.assign(user, { userNickName: e.target.value })});
	}
	onUserEmailChange(e) {
		const { user } = this.state;
		this.setState({ user: Object.assign(user, { userEmail: e.target.value })});
	}
	onRegisterSubmit(e) {
		const { user: { userNickName, userEmail } } =  this.state;
		e.preventDefault();
		this.setUser(userNickName, userEmail);
	}
	render() {
		const { user: { userNickName, userEmail, isUserAuthenticated } } =  this.state;
		return (
			<section>

				<Comments />

				{ !isUserAuthenticated &&
					<Login
						onUserNickNameChange={this.onUserNickNameChange}
						onUserEmailChange={this.onUserEmailChange}
						onRegisterSubmit={this.onRegisterSubmit}
						userNickName={userNickName}
						userEmail={userEmail} />
				}

				{ !!isUserAuthenticated &&
					<SubmitComment />
				}

			</section>
		);
	}
}

App.propTypes = {
	children: PropTypes.element,
};
