import * as React from 'react';
import {ChoiceGroupOption as FChoiceGroupOption} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function ChoiceGroupOption(props) {
   return (
      <FChoiceGroupOption {...props}>{props.children}</FChoiceGroupOption>
  );
}

ChoiceGroupOption.propTypes = {
    children: PropTypes.node,
};

export { ChoiceGroupOption as default };
