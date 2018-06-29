import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import { Text as TextInput } from 'ui/inputs';
import Button from 'ui/Button';

const Form = ({ values, touched, errors, handleSubmit, setFieldValue }) => (
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
    <Button onPress={handleSubmit} title="Submit" />
  </View>
);

Form.propTypes = {
  touched: PropTypes.shape({}),
  errors: PropTypes.shape({}),
  values: PropTypes.shape({}),
  setFieldValue: PropTypes.shape({}),
  handleSubmit: PropTypes.func,
};

const LoginForm = withFormik({
  mapPropsToValues: (props) => ({
    email: props.email,
    password: props.password,
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
    password: Yup.string().required('Password is required!'),
  }),

  handleSubmit: (values) => {
    console.log('values ', values);
  },
})(Form);

export default LoginForm;
