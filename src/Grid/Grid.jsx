import * as React from 'react';
import {Grid as FGrid} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Grid(props) {
   return (
      <FGrid {...props}>{props.children}</FGrid>
  );
}

Grid.propTypes = {
    children: PropTypes.node,
};

export { Grid as default };
