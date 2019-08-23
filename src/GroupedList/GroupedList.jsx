import * as React from 'react';
import {GroupedList as FGroupedList} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function GroupedList(props) {
   return (
      <FGroupedList {...props}>{props.children}</FGroupedList>
  );
}

GroupedList.propTypes = {
    children: PropTypes.node,
};

export { GroupedList as default };
