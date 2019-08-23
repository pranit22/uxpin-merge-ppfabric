import * as React from 'react';
import {ScrollablePane as FScrollablePane} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function ScrollablePane(props) {
   return (
      <FScrollablePane {...props}>{props.children}</FScrollablePane>
  );
}

ScrollablePane.propTypes = {
    children: PropTypes.node,
};

export { ScrollablePane as default };
