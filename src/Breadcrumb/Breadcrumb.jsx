import { Breadcrumb as FBreadcrumb } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';

function Breadcrumb(props) {
  return (
    <FBreadcrumb items={props.crumbs.split(',').map(text => ({text}))} {...props} />
  );
}

Breadcrumb.propTypes = {
  crumbs: PropTypes.string.isRequired,
  maxDisplayedItems: PropTypes.number,
  overflowIndex: PropTypes.number
};

Breadcrumb.defaultProps = {
  crumbs: 'foo,bar,baz',
  maxDisplayedItems: 3,
  overflowIndex: 0
};

export { Breadcrumb as default };
