import * as React from 'react';
import {ChoiceGroup as FChoiceGroup} from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';

function ChoiceGroup(props) {
   return (
      <FChoiceGroup {...props}>{props.children}</FChoiceGroup>
  );
}

ChoiceGroup.propTypes = {
    children: PropTypes.node,
};

export { ChoiceGroup as default };
