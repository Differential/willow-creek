import React from 'react';
import renderer from 'react-test-renderer';

import FlexedView from 'apollos-church-app/src/ui/FlexedView';
import Providers from 'apollos-church-app/src/Providers';
import Icon from 'apollos-church-app/src/ui/Icon';
import { Switch } from 'apollos-church-app/src/ui/inputs';

import TableView, { Cell, CellText, Divider } from '.';

describe('the TableView Component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <FlexedView>
          <TableView>
            <Cell>
              <Icon name="arrow-back" />
              <CellText>Line Item</CellText>
            </Cell>
            <Divider />
            <Cell>
              <Icon name="camera" />
              <CellText>A toggle!</CellText>
              <Switch />
            </Cell>
            <Divider />
            <Cell>
              <CellText>Just a row</CellText>
            </Cell>
            <Divider />
            <Cell>
              <CellText>This be some button!</CellText>
              <Icon name="arrow-next" />
            </Cell>
          </TableView>
        </FlexedView>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
