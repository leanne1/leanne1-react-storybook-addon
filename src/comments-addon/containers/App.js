import React, { Component, PropTypes } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import addonAPI from '@kadira/storybook-addons';
import { Comments, Register, SubmitComment } from '../components';
import { hasStorage } from '../utils';
import { getComments, postComment } from '../api';

export default class App extends Component {
	constructor(...args) {
		super(...args);
		this.state = {
			activeComponent: null,
			activeStory: null,
			activeVersion: null,
			user: {
				isUserAuthenticated: false,
				userName: '',
				userEmail: '',
			},
			userComment: '',
			comments: [],
		};
		this.onStoryChangeHandler = ::this.onStoryChangeHandler;
		this.fetchComments = ::this.fetchComments;
		this.onUserNameChange = ::this.onUserNameChange;
		this.onUserEmailChange = ::this.onUserEmailChange;
		this.onRegisterSubmit = ::this.onRegisterSubmit;
		this.verifyUser = ::this.verifyUser;
		this.onUserCommentChange = ::this.onUserCommentChange;
		this.onCommentSubmit = ::this.onCommentSubmit;
		this.postComment = ::this.postComment;
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
		this.setState({ userComment: '' });
	}
	verifyUser() {
		const userName = localStorage.getItem('blabbr_userName');
		const userEmail = localStorage.getItem('blabbr_userEmail');
		userName && userEmail && this.setState({ user: { userName,  userEmail, isUserAuthenticated: true }});
	}
	registerUser(nickname, email) {
		const { user } = this.state;
		localStorage.setItem('blabbr_userName', nickname);
		localStorage.setItem('blabbr_userEmail', email);
		this.setState({ user: Object.assign(user, { isUserAuthenticated: true })});
	}
	onUserNameChange(e) {
		const { user } = this.state;
		this.setState({ user: Object.assign(user, { userName: e.target.value })});
	}
	onUserEmailChange(e) {
		const { user } = this.state;
		this.setState({ user: Object.assign(user, { userEmail: e.target.value })});
	}
	onRegisterSubmit(e) {
		const { user: { userName, userEmail } } =  this.state;
		e.preventDefault();
		this.registerUser(userName, userEmail);
	}
	onUserCommentChange(e) {
		this.setState({ userComment: e.target.value });
	}
	onCommentSubmit(e) {
		const { userComment } = this.state;
		e.preventDefault();
		this.postComment(userComment);
	}
	postComment(userComment) {
		const {
			user: { userName, userEmail },
			activeComponent,
			activeStory,
			activeVersion,
			comments,
		} = this.state;

		postComment({
			userComment,
			userName,
			userEmail,
			component: activeComponent,
			story: activeStory,
			version: activeVersion,
		})
		.then((data) => {
			this.setState({
				comments: [data.comment, ...comments],
				userComment: ''
			});
		});
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
			user: { userName, userEmail, isUserAuthenticated },
			comments,
			userComment,
		} =  this.state;

		const hasComments = !!comments.length;
		return (
			<section style={{
				padding: 20,
				paddingTop: 0,
				width: "100%"
			}}>

				<Comments comments={comments}
				/>

				{ !isUserAuthenticated &&
					<Register
						onUserNameChange={this.onUserNameChange}
						onUserEmailChange={this.onUserEmailChange}
						onRegisterSubmit={this.onRegisterSubmit}
						userName={userName}
						userEmail={userEmail}
					/>
				}

				{ !!isUserAuthenticated &&
					<SubmitComment
						userComment={userComment}
						onUserCommentChange={this.onUserCommentChange}
					    onCommentSubmit={this.onCommentSubmit}
					/>
				}

			</section>
		);
	}
}

App.propTypes = {
	storybook: PropTypes.object.isRequired,
};
