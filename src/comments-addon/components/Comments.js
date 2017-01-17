import React, { Component, PropTypes } from 'react';

export default class Comments extends Component {
	render() {
		return (<div>
			<h1 className="h3">Comments</h1>
		</div>);
	}
}

Comments.propTypes = {
	children: PropTypes.element,
};
