import React from 'react';
import PropTypes from 'prop-types';

import styled from 'apollos-church-app/src/ui/styled';
import { H4, H6 } from 'apollos-church-app/src/ui/typography';
import Card, { CardContent } from 'apollos-church-app/src/ui/Card';

const Header = styled({ textAlign: 'center' }, 'Error.Header')(H4);
const ErrorText = styled({ textAlign: 'center' }, 'Error.Text')(H6);

const Err = ({ message = 'Uh oh!', error }) => {
  let errorMessage;
  if (typeof error !== 'string') {
    if (error && error.message) {
      errorMessage = error.message;
    } else if (error && error.error && typeof error.error === 'string') {
      errorMessage = error.error;
    } else {
      errorMessage = 'An unexpected error occured';
    }
  } else {
    errorMessage = error;
  }

  return (
    <Card>
      <CardContent>
        <Header>{message}</Header>
        <ErrorText>{errorMessage}</ErrorText>
      </CardContent>
    </Card>
  );
};

Err.propTypes = {
  message: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default Err;
