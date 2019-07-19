import React from 'react';
import { ScrollView } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import {
  styled,
  ThemeMixin,
  BackgroundView,
  PaddedView,
  H2,
} from '@apollosproject/ui-kit';
import MediaControls from '../MediaControls';
import HTMLContent from '../HTMLContent';
import HorizontalContentFeed from '../HorizontalContentFeed';
import StretchyView from '../../ui/StretchyView';
import OverlayBackgroundImage from '../../ui/OverlayBackgroundImage';

const FlexedScrollView = styled({ flex: 1 })(ScrollView);

const HeaderView = styled(({ theme }) => ({
  justifyContent: 'flex-end',
  paddingBottom: theme.sizing.baseUnit * 2,
}))(PaddedView);

const WillowTVContentItem = ({ content, loading }) => {
  const coverImageSources = get(content, 'coverImage.sources', []);
  return (
    <BackgroundView>
      <StretchyView
        StretchyComponent={
          coverImageSources.length || loading ? (
            <OverlayBackgroundImage
              isLoading={!coverImageSources.length && loading}
              source={coverImageSources}
            />
          ) : null
        }
      >
        {({ stretchyHeight, ...scrollViewProps }) => (
          <FlexedScrollView {...scrollViewProps}>
            <ThemeMixin mixin={{ type: 'dark' }}>
              <HeaderView style={{ height: stretchyHeight }}>
                <MediaControls contentId={content.id} />
                <H2 padded isLoading={!content.title && loading}>
                  {content.title}
                </H2>
              </HeaderView>
            </ThemeMixin>
            <PaddedView />
            <PaddedView>
              <HTMLContent contentId={content.id} />
            </PaddedView>
            <HorizontalContentFeed contentId={content.id} />
          </FlexedScrollView>
        )}
      </StretchyView>
    </BackgroundView>
  );
};

WillowTVContentItem.propTypes = {
  content: PropTypes.shape({
    __typename: PropTypes.string,
    parentChannel: PropTypes.shape({
      name: PropTypes.string,
    }),
    id: PropTypes.string,
    htmlContent: PropTypes.string,
    title: PropTypes.string,
    scriptures: PropTypes.arrayOf(
      PropTypes.shape({
        /** The ID of the verse (i.e. '1CO.15.57') */
        id: PropTypes.string,
        /** A human readable reference (i.e. '1 Corinthians 15:57') */
        reference: PropTypes.string,
        /** The scripture source to render */
        html: PropTypes.string,
      })
    ),
  }),
  loading: PropTypes.bool,
};

export default WillowTVContentItem;
