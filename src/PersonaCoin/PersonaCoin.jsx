import * as React from 'react';
import {PersonaCoin as FPersonaCoin} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function PersonaCoin(props) {
   return (
      <FPersonaCoin {...props}>{props.children}</FPersonaCoin>
  );
}

PersonaCoin.propTypes = {
    children: PropTypes.node,
};

export { PersonaCoin as default };
