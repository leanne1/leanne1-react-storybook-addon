import React from 'react';
import { storiesOf, linkTo } from '@kadira/storybook';
import Button from '../components/Button';
import { WithComments } from '../comments-addon';

storiesOf('Button', module)
	.add('link', () => (
		<WithComments>
			<Button onClick={ linkTo('Button', 'some emojies as the text') }>Next Story</Button>
		</WithComments>
	))
	.add('emoji', () => (
		<WithComments>
			<Button>😀 😎 👍 💯</Button>
		</WithComments>
	));
