import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import { Platform, Switch, View } from 'react-native';

import { withTheme } from 'apollos-church-app/src/ui/theme';
import FlexedView from 'apollos-church-app/src/ui/FlexedView';
import styled from 'apollos-church-app/src/ui/styled';
import Touchable from 'apollos-church-app/src/ui/Touchable';

import InputAddon, { AddonRow } from '../InputAddon';
import { LabelText } from '../FloatingLabel';
import InputWrapper from '../InputWrapper';
import { withInputControlViewStyles } from '../withInputControlStyles';
import ErrorText from '../ErrorText';

const ControlWrapper = withInputControlViewStyles(View);

const enhance = compose(
  pure,
  withTheme(({ theme }) => ({
    onTintColor: theme.colors.primary,
    activeTrackColor: theme.colors.primary,
    trackColor: theme.colors.background.inactive,
    tintColor: theme.colors.background.inactive,
    activeThumbColor: theme.colors.background.paper,
    ...Platform.select({
      android: { thumbTintColor: theme.colors.background.paper },
    }),
  }))
);

const LabelContainer = styled({
  justifyContent: 'center',
})(FlexedView);

const Text = enhance(
  ({
    label,
    prefix,
    error,
    wrapperStyle,
    onValueChange,
    value,
    ...switchProps
  }) => (
    <InputWrapper style={wrapperStyle}>
      <ControlWrapper>
        <AddonRow>
          <InputAddon>{prefix}</InputAddon>
          <LabelContainer>
            <Touchable onPress={() => onValueChange(!value)}>
              <LabelText>{label}</LabelText>
            </Touchable>
          </LabelContainer>
          <InputAddon>
            <Switch
              value={value}
              onValueChange={onValueChange}
              {...switchProps}
            />
          </InputAddon>
        </AddonRow>
      </ControlWrapper>

      {error && typeof error === 'string' ? (
        <ErrorText>{error}</ErrorText>
      ) : null}
    </InputWrapper>
  )
);

Text.propTypes = {
  label: PropTypes.node,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default Text;
