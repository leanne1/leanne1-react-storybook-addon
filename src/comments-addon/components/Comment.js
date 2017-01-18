import React, { PropTypes } from 'react';

const Comment = (props) => {
	return (
		<div className="mdl-card mdl-shadow--2dp comment-card">
			<div className="mdl-card__title">
				<h2 className="mdl-card__title-text">{props.nickname}</h2>
				<h3 className="mdl-card__title-text">{props.emailId}</h3>
				<datetime>{props.date}</datetime>
			</div>
			<div className="mdl-card__supporting-text">
				{props.comment}
			</div>
			<div className="mdl-card__actions mdl-card--border">
				<button
					className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
					disabled={props.approved}>
					{props.approved ? 'Approved' : 'Approve'}
				</button>
			</div>
			<div className="mdl-card__menu">
				<button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
					<i className="material-icons">mode_edit</i>
				</button>
			</div>
		</div>
	);
};

Comment.propTypes = {
	emailId: PropTypes.string.isRequired,
	nickname: PropTypes.string,
	date: PropTypes.string.isRequired,
	comment: PropTypes.string.isRequired,
	approved: PropTypes.bool,
};

Comment.defaultProps = {
	nickname: '',
	approved: false,
};

export default Comment;


