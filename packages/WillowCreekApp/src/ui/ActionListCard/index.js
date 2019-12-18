import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import {
  styled,
  TableView,
  // ImageSourceType,
  Card,
  CardContent,
  CardActions,
  withIsLoading,
  Button,
} from '@apollosproject/ui-kit';

import ActionListItem from './ActionListItem';

const Content = styled(() => ({
  borderBottomWidth: 0,
  borderTopWidth: 0,
}))(TableView);

const CardAction = styled(
  {
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  'ui-kit.ActionListCard.CardAction'
)(CardActions);

class ActionListCard extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        subtitle: PropTypes.string,
        // image: ImageSourceType,
      })
    ),
    header: PropTypes.element,
    onPressActionItem: PropTypes.func,
    onPressActionListButton: PropTypes.func,
  };

  render() {
    const {
      onPressActionListButton,
      onPressActionItem,
      isLoading,
      actions,
      header: headerContent,
    } = this.props;

    return (
      <Card isLoading={isLoading}>
        <CardContent>{headerContent}</CardContent>
        <Content>
          {actions.map((item) => (
            <ActionListItem
              action={item.action || ''}
              key={item.id}
              relatedNode={get(item, 'relatedNode')}
              onPressActionItem={onPressActionItem}
              label={item.subtitle || ''}
              title={item.title || ''}
              imageSource={get(item, 'image.sources[0]', '')}
              isLoading={isLoading}
            />
          ))}
        </Content>
        {onPressActionListButton ? (
          <CardAction>
            <Button
              title={'View More'}
              type={'default'}
              pill={false}
              bordered
              onPress={onPressActionListButton}
            />
          </CardAction>
        ) : null}
      </Card>
    );
  }
}

export default withIsLoading(ActionListCard);
