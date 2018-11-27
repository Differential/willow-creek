import React from 'react';
import { ScrollView, Image } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import {
  styled,
  GradientOverlayImage,
  BackgroundView,
  PaddedView,
  H2,
  H4,
  H5,
  H6,
  TableView,
  Cell,
  CellContent,
  Divider,
  UIText,
  withThemeMixin,
} from '@apollosproject/ui-kit';

import HorizontalContentFeed from '../HorizontalContentFeed';
import MediaControls from '../MediaControls';
import AdditionalFeatures from './AdditionalFeatures';

const FlexedScrollView = styled({ flex: 1 })(ScrollView);

const PrimaryContentBlock = withThemeMixin(({ theme }) => ({
  type: 'dark',
  colors: {
    paper: theme.colors.secondary,
    screen: theme.colors.secondary,
  },
}))(BackgroundView);

const CellImage = styled(({ theme }) => ({
  width: theme.sizing.baseUnit * 4,
  height: theme.sizing.baseUnit * 4,
}))(Image);

const WillowTVContentItem = ({ content, loading }) => {
  const coverImageSources = get(content, 'coverImage.sources', []);
  return (
    <FlexedScrollView>
      <PrimaryContentBlock>
        {coverImageSources.length || loading ? (
          <GradientOverlayImage
            isLoading={!coverImageSources.length && loading}
            source={coverImageSources}
          />
        ) : null}
        <MediaControls contentId={content.id} />
        <PaddedView>
          <H2 isLoading={!content.title && loading}>{content.title}</H2>
          <UIText isLoading={!content.summary && loading}>
            {content.summary}
          </UIText>
        </PaddedView>
      </PrimaryContentBlock>

      <AdditionalFeatures contentId={content.id} />

      <PaddedView style={{ paddingBottom: 0 }}>
        <H5 padded>Engage</H5>
      </PaddedView>
      <TableView>
        <Cell>
          <CellImage source={require('./bible-app.png')} />
          <CellContent>
            <H4>Message Notes</H4>
            <H6>Follow along with the message!</H6>
          </CellContent>
        </Cell>
        <Divider />
        <Cell>
          <CellImage source={require('./disc-q.png')} />
          <CellContent>
            <H4>Discussion Questions</H4>
            <H6>Key points to consider from this message</H6>
          </CellContent>
        </Cell>
      </TableView>

      <HorizontalContentFeed contentId={content.id} />
    </FlexedScrollView>
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
