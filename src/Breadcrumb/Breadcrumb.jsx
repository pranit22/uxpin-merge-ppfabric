import { Breadcrumb as FBreadcrumb, FontSizes } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { mergeStyles } from '@uifabric/merge-styles';


class Breadcrumb extends React.Component {
  getBreadcrumbClasses() {
    return mergeStyles({
      // marginTop: -5,
      // marginBottom: -10,
      display: 'inline - block',
      width: 'min-content',
      height: 'min-content',
      selectors: {
        '& .ms-Breadcrumb-item': {
          fontSize: FontSizes[this.props.fontSize],
        },
        '& .ms-Breadcrumb-list': {
          height: 'min-content',
          // paddingTop: 15,
          verticalAlign: 'middle'
        }
      }
    })
  }

  render() {
    return (
      <FBreadcrumb className="BreadcrumbComponent"
        items={this.props.crumbs.split(',').map(text => ({ text }))}
        className={this.getBreadcrumbClasses()} {...this.props} />
    );
  }
}

Breadcrumb.propTypes = {
  crumbs: PropTypes.string.isRequired,
  maxDisplayedItems: PropTypes.number,
  overflowIndex: PropTypes.number,
  fontSize: PropTypes.oneOf(['small', 'smallPlus', 'medium', 'mediumPlus']),
};

Breadcrumb.defaultProps = {
  crumbs: 'foo,bar,baz',
  maxDisplayedItems: 3,
  overflowIndex: 0,
  fontSize: 'small'
};

export { Breadcrumb as default };
