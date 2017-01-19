import React, { PropTypes } from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Panel } from 'react-bootstrap';

const Register = ({
	onUserNameChange,
	onUserEmailChange,
	onRegisterSubmit,
	userName,
	userEmail,
}) => {
	const formTitle = (
		<h2>Register to add comments</h2>
	);

	return (
		<Panel header={formTitle}>
			<form>
				<FormGroup>
					<ControlLabel htmlFor="user-name">
						User name:
					</ControlLabel>
					<FormControl
						id="user-name"
						value={userName}
						onChange={onUserNameChange}
					/>
				</FormGroup>
				<FormGroup>
					<ControlLabel htmlFor="email">
						Email:
					</ControlLabel>
					<FormControl
						id="email"
						value={userEmail}
						onChange={onUserEmailChange}
					/>
				</FormGroup>
				<Button
					type="submit"
					bsClass="btn btn-success"
					onClick={onRegisterSubmit}
				>
					Register
				</Button>
			</form>
		</Panel>
	);
};

Register.propTypes = {
	onUserNameChange: PropTypes.func.isRequired,
	onUserEmailChange: PropTypes.func.isRequired,
	onRegisterSubmit: PropTypes.func.isRequired,
	userName: PropTypes.string,
	userEmail: PropTypes.string,
};

export default Register;
