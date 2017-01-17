import React, { Component, PropTypes } from 'react';
import addonAPI from '@kadira/storybook-addons';
import { App } from './components';

const styles = {
	notesPanel: {
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
		this.state = { text: '' };
		this.onAddComments = this.onAddComments.bind(this);
	}
	componentDidMount() {
		const { channel, api } = this.props;
		// Listen to the notes and render it.
		channel.on('kadira/notes/add_notes', this.onAddComments);

		// Clear the current notes on every story change.
		this.stopListeningOnStory = api.onStory(() => {
			this.onAddComments('');
		});
	}
	// This is some cleanup tasks when the Comments panel is unmounting.
	componentWillUnmount() {
		if (this.stopListeningOnStory) {
			this.stopListeningOnStory();
		}

		this.unmounted = true;
		const { channel } = this.props;
		channel.removeListener('kadira/notes/add_notes', this.onAddComments);
	}
	onAddComments(text) {
		this.setState({ text });
	}
	render() {
		const { text } = this.state;
		const textAfterFormatted = text ? text.trim().replace(/\n/g, '<br />') : '';

		return (
			<div style={styles.notesPanel}>
				<App />
				<div dangerouslySetInnerHTML={{ __html: textAfterFormatted }} />
			</div>
		);
	}
}

Comments.propTypes = {
	channel: PropTypes.object,
	api: PropTypes.object,
};

// Register the addon with a unique name.
addonAPI.register('kadira/notes', (storybookAPI) => {
	// Also need to set a unique name to the panel.
	addonAPI.addPanel('kadira/notes/panel', {
		title: 'Comments',
		render: () => (
			<Comments channel={addonAPI.getChannel()} api={storybookAPI} />
		),
	});
});
