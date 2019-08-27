import * as React from 'react';
import {Breadcrumb as FBreadcrumb} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Breadcrumb(props) {
   return (
      <FBreadcrumb {...props}>{props.children}</FBreadcrumb>
  );
}

Breadcrumb.propTypes = {
    items: PropTypes.shape({
      href: PropTypes.string,
      isCurrentItem: PropTypes.bool,
      text: PropTypes.string
    })
};

export { Breadcrumb as default };
