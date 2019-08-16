import React from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import {
  styled,
  GradientOverlayImage,
  BackgroundView,
  PaddedView,
  H2,
  StretchyView,
  ThemeMixin,
  ThemeConsumer,
  CardLabel,
} from '@apollosproject/ui-kit';
import MediaControls from '../MediaControls';
import HTMLContent from '../HTMLContent';
import HorizontalContentFeed from '../HorizontalContentFeed';
import Features from '../Features';

const FlexedScrollView = styled({ flex: 1 })(ScrollView);

const Header = styled(({ hasMedia, theme }) => ({
  paddingTop: Dimensions.get('window').width * 0.5, // for some reason % based padding still is buggy
  alignItems: 'flex-start',
  paddingBottom: hasMedia ? theme.sizing.baseUnit : theme.sizing.baseUnit * 2,
  // backgroundColor: theme.colors.primary,
}))(PaddedView);

const WeekendContentItem = ({ content, loading }) => {
  const coverImageSources = get(content, 'coverImage.sources', []);
  return (
    <ThemeMixin mixin={content.theme || {}}>
      <ThemeConsumer>
        {(theme) => (
          <BackgroundView>
            <StretchyView>
              {({ Stretchy, ...scrollViewProps }) => (
                <FlexedScrollView {...scrollViewProps}>
                  <Header hasMedia={content.videos && content.videos.sources}>
                    <ThemeMixin mixin={{ type: 'dark' }}>
                      {coverImageSources.length || loading ? (
                        <Stretchy
                          background
                          style={{ backgroundColor: theme.colors.primary }}
                        >
                          <GradientOverlayImage
                            isLoading={!coverImageSources.length && loading}
                            overlayColor={theme.colors.primary}
                            overlayType="featured"
                            source={coverImageSources}
                          />
                        </Stretchy>
                      ) : null}
                      <CardLabel
                        title={
                          content.parentChannel && content.parentChannel.name
                        }
                      />
                      <H2 padded isLoading={!content.title && loading}>
                        {content.title}
                      </H2>
                      <HTMLContent contentId={content.id} />
                    </ThemeMixin>
                  </Header>
                  <MediaControls contentId={content.id} />
                  <Features contentId={content.id} />
                  <HorizontalContentFeed contentId={content.id} />
                </FlexedScrollView>
              )}
            </StretchyView>
          </BackgroundView>
        )}
      </ThemeConsumer>
    </ThemeMixin>
  );
};

WeekendContentItem.propTypes = {
  content: PropTypes.shape({
    __typename: PropTypes.string,
    parentChannel: PropTypes.shape({
      name: PropTypes.string,
    }),
    id: PropTypes.string,
    title: PropTypes.string,
  }),
  loading: PropTypes.bool,
};

export default WeekendContentItem;
