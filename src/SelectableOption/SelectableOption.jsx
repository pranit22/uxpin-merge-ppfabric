import * as React from 'react';
import {SelectableOption as FSelectableOption} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function SelectableOption(props) {
   return (
      <FSelectableOption {...props}>{props.children}</FSelectableOption>
  );
}

SelectableOption.propTypes = {
    children: PropTypes.node,
};

export { SelectableOption as default };
