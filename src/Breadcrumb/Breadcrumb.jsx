import { Breadcrumb as FBreadcrumb, FontSizes } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { mergeStyles } from '@uifabric/merge-styles';



function Breadcrumb(props) {
  let breadcrumbClasses = mergeStyles({
    marginTop: -5,
    marginBottom: -10,
    display: 'inline - block',
    width: 'min-content',
    height: 'min-content',
    selectors: {
      '& .ms-Breadcrumb-item': {
        fontSize: FontSizes[props.fontSize],
      },
      '& .ms-Breadcrumb-list': {
        height: 31,
        padding: '15px 0px 20px 0px',
        verticalAlign: 'middle'
      }
    }
  })

  return (
    <FBreadcrumb className="BreadcrumbComponent"
      items={props.crumbs.split(',').map(text => ({ text }))}
      className={breadcrumbClasses} {...props} />
  );
}

Breadcrumb.propTypes = {
  crumbs: PropTypes.string.isRequired,
  maxDisplayedItems: PropTypes.number,
  overflowIndex: PropTypes.number,
  size: PropTypes.oneOf(Object.keys(FontSizes)),
};

Breadcrumb.defaultProps = {
  crumbs: 'foo,bar,baz',
  maxDisplayedItems: 3,
  overflowIndex: 0,
  fontSize: 'small'
};

export { Breadcrumb as default };
