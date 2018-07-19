import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { Text as TextInput } from 'ui/inputs';
import Button, { ButtonLink } from 'ui/Button';
import { WebBrowserConsumer } from 'ui/WebBrowser';

const Form = ({
  values,
  touched,
  errors,
  handleSubmit,
  setFieldValue,
  isValid,
  isSubmitting,
}) => (
  <View>
    <TextInput
      label="Email"
      type="email"
      value={values.email}
      error={touched.email && errors.email}
      onChangeText={(text) => setFieldValue('email', text)}
    />
    <TextInput
      label="Password"
      type="password"
      value={values.password}
      error={touched.password && errors.password}
      onChangeText={(text) => setFieldValue('password', text)}
    />
    <WebBrowserConsumer>
      {(openUrl) => (
        <ButtonLink
          onPress={() => openUrl('https://apollosrock.newspring.cc/page/56/')}
        >
          Forgot your password?
        </ButtonLink>
      )}
    </WebBrowserConsumer>
    <Button
      onPress={handleSubmit}
      title="Submit"
      disabled={!isValid}
      loading={isSubmitting}
    />
  </View>
);

Form.propTypes = {
  setFieldValue: PropTypes.func,
  touched: PropTypes.shape({}),
  errors: PropTypes.shape({}),
  values: PropTypes.shape({}),
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
};

export default Form;
