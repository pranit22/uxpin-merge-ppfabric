import * as React from 'react';
import {Label as FLabel} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function Label(props) {
   return (
      <FLabel {...props}>{props.children}</FLabel>
  );
}

Label.propTypes = {
    children: PropTypes.node,
};

export { Label as default };
