import * as React from 'react';
import {Shimmer as FShimmer} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Shimmer(props) {
   return (
      <FShimmer {...props}>{props.children}</FShimmer>
  );
}

Shimmer.propTypes = {
    children: PropTypes.node,
};

export { Shimmer as default };
