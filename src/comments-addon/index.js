import { Component, PropTypes } from 'react';

export class WithComments extends Component {
	render() {
		return this.props.children;
	}
}

WithComments.propTypes = {
	children: PropTypes.element,
};
