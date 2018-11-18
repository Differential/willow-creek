import React, { PureComponent } from 'react';
import { View, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  FlexedView,
  PaddedView,
  TextInput,
  Button,
  styled,
} from '@apollosproject/ui-kit';

const BottomSafeAreaView = styled({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
})(SafeAreaView);

class Form extends PureComponent {
  static propTypes = {
    setFieldValue: PropTypes.func,
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
    values: PropTypes.shape({}),
    handleSubmit: PropTypes.func,
    isSubmitting: PropTypes.bool,
    isValid: PropTypes.bool,
  };

  render() {
    const {
      values,
      touched,
      errors,
      handleSubmit,
      setFieldValue,
      isValid,
      isSubmitting,
    } = this.props;
    return (
      <FlexedView>
        <KeyboardAwareScrollView>
          <PaddedView>
            <View>
              <TextInput
                label="Email"
                type="email"
                value={values.email}
                error={touched.email && errors.email}
                onChangeText={(text) => setFieldValue('email', text)}
                onSubmitEditing={() => this.passwordInput.focus()}
                returnKeyType="next"
                textContentType="username"
                enablesReturnKeyAutomatically
              />
              <TextInput
                label="Password"
                type="password"
                value={values.password}
                error={touched.password && errors.password}
                onChangeText={(text) => setFieldValue('password', text)}
                onSubmitEditing={handleSubmit}
                returnKeyType="go"
                textContentType="password"
                enablesReturnKeyAutomatically
                inputRef={(r) => {
                  this.passwordInput = r;
                }}
              />
            </View>
          </PaddedView>
        </KeyboardAwareScrollView>
        <BottomSafeAreaView>
          <PaddedView vertical={false}>
            <Button
              onPress={handleSubmit}
              title="Register"
              disabled={!isValid}
              loading={isSubmitting}
            />
          </PaddedView>
        </BottomSafeAreaView>
      </FlexedView>
    );
  }
}

export default Form;
