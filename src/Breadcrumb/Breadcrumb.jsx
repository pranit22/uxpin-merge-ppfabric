import { Breadcrumb as FBreadcrumb } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';

function Breadcrumb(props) {
  function getItems(){
    console.log(props.crumbs, props);
    const items = props.crumbs.split(',');
    if(items.length){
      return props.crumbs.split(',').map(text => ({text}))
    }
    return [];
  }
  return (
    <FBreadcrumb items={getItems()} {...props} />
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
