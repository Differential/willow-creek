import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import moment from 'moment';

import Placeholder from 'apolloschurchapp/src/ui/Placeholder';
import { withIsLoading } from 'apolloschurchapp/src/ui/isLoading';
import { withTheme, withThemeMixin } from 'apolloschurchapp/src/ui/theme';
import styled from 'apolloschurchapp/src/ui/styled';
import { H3, H5, H6 } from 'apolloschurchapp/src/ui/typography';
import { CardContent, CardActions } from 'apolloschurchapp/src/ui/Card';
import ChannelLabel from 'apolloschurchapp/src/ui/ChannelLabel';

const enhance = compose(
  withIsLoading,
  withThemeMixin(({ theme }) => ({
    type: 'light',
    colors: {
      background: {
        inactive: theme.colors.lightSecondary,
      },
    },
  })),
  withTheme(),
  pure
);

const TileSpacer = styled(({ theme }) => ({
  padding: theme.sizing.baseUnit / 2,
}))(View);

const Tile = styled(({ theme }) => ({
  height: '100%',
  aspectRatio: 1,
  borderRadius: theme.sizing.baseUnit,
  backgroundColor: theme.colors.lightTertiary,
}))(View);

const PlaceholderOverflowFix = styled(({ theme }) => ({
  ...StyleSheet.absoluteFillObject,
  justifyContent: 'center',
  borderRadius: theme.sizing.baseUnit,
  overflow: 'hidden',
}))(View);

const TileNumber = styled(({ theme, size }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: theme.helpers.rem(1 * (size < 2 ? 2 : size)),
  height: theme.helpers.rem(1 * (size < 2 ? 2 : size)),
  justifyContent: 'center',
  alignItems: 'center',
  borderTopLeftRadius: theme.sizing.baseUnit,
  borderBottomRightRadius: theme.sizing.baseUnit,
  backgroundColor: theme.colors.white,
}))(View);

const relativeTime = (date) => {
  if (moment.updateLocale) {
    moment.updateLocale('en', {
      relativeTime: {
        future: 'in %s',
        past: '%s ago',
        s: 's',
        m: 'm',
        mm: '%dm',
        h: '1h',
        hh: '%dh',
        d: '1d',
        dd: '%dd',
        M: '1mo',
        MM: '%dmo',
        y: '1y',
        yy: '%dy',
      },
    });
  }

  const time = moment(new Date(date));
  return time.fromNow(true); // true omits 'ago'
};

export const CardTile = enhance(
  ({
    number,
    title,
    byLine,
    date,
    style: styleProp = {},
    isLoading,
    theme,
    children,
    ...otherProps
  }) => (
    <TileSpacer collapsable={false}>
      <Tile style={styleProp} {...otherProps}>
        <PlaceholderOverflowFix>
          {typeof number === 'undefined' ? null : (
            <TileNumber size={number.toString().length}>
              <Placeholder.Media
                size={theme.helpers.rem(
                  1.25 *
                    (number.toString().length < 2
                      ? 2
                      : number.toString().length)
                )}
                onReady={!isLoading}
              >
                <View>
                  <H5>{number}</H5>
                </View>
              </Placeholder.Media>
            </TileNumber>
          )}

          {typeof title === 'undefined' ? null : (
            <CardContent>
              <H3>{title}</H3>
            </CardContent>
          )}

          {byLine ? (
            <CardActions>
              <ChannelLabel
                label={byLine}
                icon={'video'}
                isLoading={isLoading}
                withFlex
              />
              {typeof date === 'undefined' ? null : (
                <H6>{relativeTime(date)}</H6>
              )}
            </CardActions>
          ) : null}

          {children}
        </PlaceholderOverflowFix>
      </Tile>
    </TileSpacer>
  )
);

CardTile.propTypes = {
  title: PropTypes.string,
  number: PropTypes.number,
  byLine: PropTypes.string,
  date: PropTypes.string,
  style: PropTypes.any, // eslint-disable-line
  isLoading: PropTypes.bool,
};

export default CardTile;
