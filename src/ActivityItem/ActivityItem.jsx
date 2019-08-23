import * as React from 'react';
import {ActivityItem as FActivityItem} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function ActivityItem(props) {
   return (
      <FActivityItem {...props}>{props.children}</FActivityItem>
  );
}

ActivityItem.propTypes = {
    children: PropTypes.node,
};

export { ActivityItem as default };
