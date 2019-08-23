import * as React from 'react';
import {PersonaPresence as FPersonaPresence} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function PersonaPresence(props) {
   return (
      <FPersonaPresence {...props}>{props.children}</FPersonaPresence>
  );
}

PersonaPresence.propTypes = {
    children: PropTypes.node,
};

export { PersonaPresence as default };
