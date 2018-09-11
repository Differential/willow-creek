import React from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { View } from 'react-native';

// import HTMLView from 'apolloschurchapp/src/ui/HTMLView';
import Spacer from 'apolloschurchapp/src/ui/Spacer';

import Item from './Item';
import getScripture from './getScripture';

// const copyright =
//   '<h6>Scripture taken from The Holy Bible, English Standard Version. Copyright &copy;2001 by <a href="http://www.crosswaybibles.org">Crossway Bibles</a>, a publishing ministry of Good News Publishers. Used by permission. All rights reserved. Text provided by the <a href="http://www.gnpcb.org/esv/share/services/">Crossway Bibles Web Service</a><h6>';

const Scripture = ({ references = [] }) => (
  <View>
    {references.map((query) => (
      <Query query={getScripture} variables={{ query }} key={query}>
        {({ loading, data }) => (
          <Item
            reference={get(data, 'scripture.reference', '')}
            html={get(data, 'scripture.html', '')}
            isLoading={loading}
          />
        )}
      </Query>
    ))}
    <Spacer byHeight />
    {/* <HTMLView>{copyright}</HTMLView> */}
  </View>
);

Scripture.propTypes = {
  references: PropTypes.arrayOf(PropTypes.string),
};

export default Scripture;
