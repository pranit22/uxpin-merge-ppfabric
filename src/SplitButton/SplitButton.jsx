import * as React from 'react';
import {SplitButton as FSplitButton} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function SplitButton(props) {
   return (
      <FSplitButton {...props}>{props.children}</FSplitButton>
  );
}

SplitButton.propTypes = {
    children: PropTypes.node,
};

export { SplitButton as default };
