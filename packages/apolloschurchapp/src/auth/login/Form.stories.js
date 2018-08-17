import React from 'react';
import { storiesOf } from '@storybook/react-native';

import LoginForm from './Form';

storiesOf('Auth/LoginForm', module).add('Example', () => (
  <LoginForm
    values={{ email: '', password: '' }}
    touched={{ email: false, password: false }}
    errors={{ email: null, password: null }}
  />
));
