import { Component, PropTypes } from 'react';
// import addons from '@kadira/storybook-addons';

export class WithComments extends Component {
	render() {
		const { children } = this.props;
		return children;
	}
}

WithComments.propTypes = {
	children: PropTypes.element,
};
