import { Breadcrumb as FBreadcrumb, FontSizes } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';

function Breadcrumb(props) {
  return (
    <FBreadcrumb className="BreadcrumbComponent" items={props.crumbs.split(',').map(text => ({text}))} styles={{
      itemLink : {
        fontSize: FontSizes.medium
      },
      item : {
        fontSize: FontSizes.medium
      }
    }} {...props} />
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
