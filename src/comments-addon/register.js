import React from 'react';
import addonAPI from '@kadira/storybook-addons';
import { App as Comments } from './containers';

// Register the addon with a unique name.
addonAPI.register('leanne1/comments', (storybookAPI) => {
	// Also need to set a unique name to the panel.
	addonAPI.addPanel('leanne1/comments/panel', {
		title: 'Comments',
		render: () => (
			<Comments storybook={storybookAPI} />
		),
	});
});
