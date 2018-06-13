import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { UIText } from 'ui/typography';
import styled from 'ui/styled';

const Container = styled(({ theme }) => ({
  justifyContent: 'center',
  backgroundColor: theme.colors.primary,
  paddingVertical: theme.sizing.baseUnit / 4,
  paddingHorizontal: theme.sizing.baseUnit / 2,
}))(View);

const Button = styled(({ theme }) => ({
  backgroundColor: theme.colors.primary,
}))(TouchableOpacity);

const Title = styled({ textAlign: 'center' })(UIText);

const LiveNowButton = (props) => (
  <Container>
    <Button onPress={() => props.navigation.navigate('LiveNowModal')}>
      <Title> Live Now! </Title>
    </Button>
  </Container>
);

LiveNowButton.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default LiveNowButton;
