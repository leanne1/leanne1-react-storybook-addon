import React from 'react';
import { storiesOf, linkTo } from '@kadira/storybook';
import Button from '../components/Button';
import { WithComments } from '../comments-addon';

storiesOf('Button', module)
	.add('link button', () => (
		<WithComments>
			<Button onClick={ linkTo('Button', 'some emojies as the text') }>Next Story</Button>
		</WithComments>
	))
	.add('some emojies as the text', () => (
		<WithComments>
			<Button>😀 😎 👍 💯</Button>
		</WithComments>
	));
