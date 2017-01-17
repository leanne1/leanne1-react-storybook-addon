import React from 'react';
import { storiesOf, linkTo } from '@kadira/storybook';
import Button from '../components/Button';
import { WithNotes } from '../comments-addon';

storiesOf('Button', module)
	.add('link button', () => (
		<WithNotes notes={'This is a very simple Button and you can click on it.'}>
			<Button onClick={ linkTo('Button', 'some emojies as the text') }>Next Story</Button>
		</WithNotes>
	))
	.add('some emojies as the text', () => (
		<WithNotes notes={'This is a very simple Button and you can click on it.'}>
			<Button>😀 😎 👍 💯</Button>
		</WithNotes>
	));
