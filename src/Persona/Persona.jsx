import * as React from 'react';
import {Persona as FPersona} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Persona(props) {
   return (
      <FPersona {...props}>{props.children}</FPersona>
  );
}

Persona.propTypes = {
    children: PropTypes.node,
};

export { Persona as default };
