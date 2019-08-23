import * as React from 'react';
import {Callout as FCallout} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Callout(props) {
   return (
      <FCallout {...props}>{props.children}</FCallout>
  );
}

Callout.propTypes = {
    children: PropTypes.node,
};

export { Callout as default };
