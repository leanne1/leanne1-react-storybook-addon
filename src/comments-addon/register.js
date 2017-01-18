import React, { Component, PropTypes } from 'react';
import addonAPI from '@kadira/storybook-addons';
import { App } from './containers';

const styles = {
	commentsPanel: {
		margin: 10,
		fontFamily: 'Arial',
		fontSize: 14,
		color: '#444',
		width: '100%',
		overflow: 'auto',
	},
};

class Comments extends Component {
	constructor(...args) {
		super(...args);
	}
	render() {
		return (
			<div style={styles.commentsPanel}>
				<App />
			</div>
		);
	}
}

// Register the addon with a unique name.
addonAPI.register('leanne1/comments', (storybookAPI) => {
	// Also need to set a unique name to the panel.
	addonAPI.addPanel('leanne1/comments/panel', {
		title: 'Comments',
		render: () => (
			<Comments />
		),
	});
});
