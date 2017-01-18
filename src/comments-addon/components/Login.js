import React, { Component, PropTypes } from 'react';

export default class Login extends Component {
	render() {
		const {
			onUserNickNameChange,
			onUserEmailChange,
			onRegisterSubmit,
			userNickName,
			userEmail
		} = this.props;

		return (
			<section>
				<form>
					<div style={{
						borderStyle: "solid",
						borderWidth: 1,
						borderColor: "rgba(0,0,0,.12)",
						padding: 12,
						paddingTop: 0
					}}>
						<h5 className="mdl-h5">Register to add comments</h5>
						<div className="mdl-textfield">
							<input
								className="mdl-textfield__input"
								type="text"
								id="nickname"
								value={userNickName || ''}
								onChange={onUserNickNameChange} />
							<label
								className="mdl-textfield__label"
								htmlFor="nickname">
								Nick name
							</label>
						</div>

						<div className="mdl-textfield">
							<input
								className="mdl-textfield__input"
								type="text"
								id="email"
								value={userEmail || ''}
								onChange={onUserEmailChange} />
							<label
								className="mdl-textfield__label"
								htmlFor="email">
								Email
							</label>
						</div>

						<button
							type="submit"
							className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
							onClick={onRegisterSubmit}>
							Register
						</button>
					</div>
				</form>
			</section>

		);
	}
}

Login.propTypes = {
	onUserNickNameChange: PropTypes.func.isRequired,
	onUserEmailChange: PropTypes.func.isRequired,
	onRegisterSubmit: PropTypes.func.isRequired,
	userNickName: PropTypes.string,
	userEmail: PropTypes.string,
};
