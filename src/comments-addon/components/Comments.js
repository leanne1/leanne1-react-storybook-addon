import React, { Component, PropTypes } from 'react';
import Comment from './Comment';

const Comments = ({comments}) => {
	const commentsComponents = comments.map((comment, i) => {
		const months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		];
		const _date = new Date(comment.timestamp);
		const date = _date.getDate();
		const month = months[_date.getMonth()];
		const year = _date.getFullYear();
		return (
			<Comment key={i}
		         nickname={comment.userName}
		         emailId={comment.userEmail}
		         date={`${date} ${month} ${year}`}
		         comment={ comment.comment}
		         approved={comment.approved} />
		)
	});
	return 	(
		<div>
			<h5>Comments</h5>
			{ commentsComponents }
		</div>
	);
};

Comments.propTypes = {
	comments: PropTypes.array,
};

Comment.defaultProps = {
	comments: [],
};

export default Comments;
