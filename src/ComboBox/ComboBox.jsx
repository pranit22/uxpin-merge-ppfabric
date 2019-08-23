import * as React from 'react';
import {ComboBox as FComboBox} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function ComboBox(props) {
   return (
      <FComboBox {...props}>{props.children}</FComboBox>
  );
}

ComboBox.propTypes = {
    children: PropTypes.node,
};

export { ComboBox as default };
