import * as React from 'react';
import {TeachingBubble as FTeachingBubble} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function TeachingBubble(props) {
   return (
      <FTeachingBubble {...props}>{props.children}</FTeachingBubble>
  );
}

TeachingBubble.propTypes = {
    children: PropTypes.node,
};

export { TeachingBubble as default };
