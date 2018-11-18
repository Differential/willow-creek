import React, { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Parser, DomHandler } from 'htmlparser2';

import { Paragraph as ParagraphPlaceholder } from '@apollosproject/ui-kit';

import defaultRenderer from './defaultRenderer';

class HTMLView extends PureComponent {
  static propTypes = {
    children: PropTypes.string,
    renderer: PropTypes.func,
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    renderer: defaultRenderer,
  };

  constructor(...args) {
    super(...args);
    this.parser = new Parser(
      new DomHandler(
        (err, dom) => {
          this.parsed = this.renderDom(dom);
        },
        { normalizeWhitespace: true }
      )
    );
    if (this.props.children) this.parse(this.props.children);
  }

  componentWillUpdate(props) {
    this.parse(props.children);
  }

  parse(html = '') {
    this.parser.write(html);
    this.parser.done();
  }

  renderDom(dom) {
    return dom
      .map((node, index) => {
        let children = [];
        if (node.children) children = this.renderDom(node.children);

        let renderedNode = this.props.renderer(node, { children });
        if (
          !renderedNode &&
          renderedNode !== null &&
          this.props.renderer !== defaultRenderer
        ) {
          renderedNode = defaultRenderer(node, { children });
        }

        if (renderedNode && !Array.isArray(renderedNode)) {
          renderedNode = cloneElement(renderedNode, { key: index });
        }
        return renderedNode;
      })
      .filter((e) => e !== undefined);
  }

  render() {
    return (
      <ParagraphPlaceholder lineNumber={8} onReady={!this.props.isLoading}>
        <View>{this.parsed}</View>
      </ParagraphPlaceholder>
    );
  }
}

export default HTMLView;
