import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import {
  styled,
  GradientOverlayImage,
  FlexedView,
  PaddedView,
  StretchyView,
  ThemeMixin,
  ThemeConsumer,
  H2,
} from '@apollosproject/ui-kit';
import MediaControls from '../MediaControls';
import HTMLContent from '../HTMLContent';
import HorizontalContentFeed from '../HorizontalContentFeed';

const FlexedScrollView = styled({ flex: 1 })(ScrollView);

const Content = styled(() => ({
  alignItems: 'flex-start',
}))(View);

const ContentSeriesContentItem = ({ content, loading }) => {
  const coverImageSources = get(content, 'coverImage.sources', []);
  return (
    <ThemeConsumer>
      {(theme) => {
        const overlayColor =
          get(content, 'theme.colors.primary') ||
          (loading ? theme.colors.lightTertiary : theme.colors.primary);
        return (
          <FlexedView style={{ backgroundColor: overlayColor }}>
            <StretchyView>
              {({ Stretchy, ...scrollViewProps }) => (
                <FlexedScrollView {...scrollViewProps}>
                  <Content>
                    <ThemeMixin
                      mixin={{
                        type: (
                          get(content, 'theme.type') || 'dark'
                        ).toLowerCase(),
                      }}
                    >
                      {coverImageSources.length || loading ? (
                        <Stretchy>
                          <GradientOverlayImage
                            isLoading={!coverImageSources.length && loading}
                            overlayColor={overlayColor}
                            source={coverImageSources}
                          />
                        </Stretchy>
                      ) : null}
                      <MediaControls contentId={content.id} />

                      <PaddedView>
                        <H2 padded isLoading={!content.title && loading}>
                          {content.title}
                        </H2>
                        <HTMLContent contentId={content.id} />
                      </PaddedView>

                      <HorizontalContentFeed contentId={content.id} />
                    </ThemeMixin>
                  </Content>
                </FlexedScrollView>
              )}
            </StretchyView>
          </FlexedView>
        );
      }}
    </ThemeConsumer>
  );
};

ContentSeriesContentItem.propTypes = {
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

export default ContentSeriesContentItem;
