import React, { Component, PropTypes } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import addonAPI from '@kadira/storybook-addons';
import { Comments, Register, SubmitComment } from '../components';
import { hasStorage } from '../utils';
import { getComments } from '../api';

export default class App extends Component {
	constructor(...args) {
		super(...args);
		this.state = {
			activeComponent: null,
			activeStory: null,
			activeVersion: null,
			user: {
				isUserAuthenticated: null,
				userNickName: null,
				userEmail: null,
			},
			userComment: null,
			comments: [],
		};
		this.onStoryChangeHandler = ::this.onStoryChangeHandler;
		this.fetchComments = ::this.fetchComments;
		this.onUserNickNameChange = ::this.onUserNickNameChange;
		this.onUserEmailChange = ::this.onUserEmailChange;
		this.onRegisterSubmit = ::this.onRegisterSubmit;
		this.verifyUser = ::this.verifyUser;
	}
	componentWillMount() {
		hasStorage('localStorage') && this.verifyUser();
	}
	componentDidMount() {
		const { storybook } = this.props;
		storybook.onStory && storybook.onStory((kind, story) => this.onStoryChangeHandler(kind, story));
	}
	onStoryChangeHandler(kind, story) {
		this.setState({
			activeComponent: kind,
			activeStory: story
		});
		this.fetchComments(kind, story);
	}
	verifyUser() {
		const userNickName = localStorage.getItem('blabbr_userNickName');
		const userEmail = localStorage.getItem('blabbr_userEmail');
		userNickName && userEmail && this.setState({ user: { userNickName,  userEmail, isUserAuthenticated: true }});
	}
	registerUser(nickname, email) {
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
		this.registerUser(userNickName, userEmail);
	}
	fetchComments(kind, story, version) {
		getComments(kind, story, version)
			.then(data => {
				this.setState({ comments: data.comments });
			})
			.catch((e) => {});
	}
	render() {
		const {
			user: { userNickName, userEmail, isUserAuthenticated },
			comments,
		} =  this.state;

		const hasComments = !!comments.length;
		return (
			<section style={{
				padding: 20,
				paddingTop: 0,
				width: "100%"
			}}>

				<Comments comments={comments} />

				{ !isUserAuthenticated &&
					<Register
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
	storybook: PropTypes.object.isRequired,
};
