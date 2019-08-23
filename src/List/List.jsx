import * as React from 'react';
import {List as FList} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function List(props) {
   return (
      <FList {...props}>{props.children}</FList>
  );
}

List.propTypes = {
    children: PropTypes.node,
};

export { List as default };
