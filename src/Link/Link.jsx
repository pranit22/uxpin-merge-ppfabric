import * as React from 'react';
import {Link as FLink} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Link(props) {
   return (
      <FLink {...props}>{props.children}</FLink>
  );
}

Link.propTypes = {
    children: PropTypes.node,
};

export { Link as default };
