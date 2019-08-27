import { Breadcrumb as FBreadcrumb } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';

function Breadcrumb(props) {
  return (
    <FBreadcrumb {...props}>{props.children}</FBreadcrumb>
  );
}

Breadcrumb.propTypes = {
  items: PropTypes.array,
  maxDisplayedItems: PropTypes.number
};

Breadcrumb.defaults = {
  items: [
    {
      href: '#foo',
      isCurrentItem: false,
      text: 'Foo'
    },
    {
      href: '#bar',
      isCurrentItem: true,
      text: 'Bar'
    }
  ]
};

export { Breadcrumb as default };
