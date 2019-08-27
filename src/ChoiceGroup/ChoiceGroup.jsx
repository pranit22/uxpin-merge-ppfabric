import { ChoiceGroup as FChoiceGroup } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';

function ChoiceGroup(props) {
  return (
    <FChoiceGroup {...props}>{props.children}</FChoiceGroup>
  );
}

ChoiceGroup.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.shape({
    checked: PropTypes.bool,
    text: PropTypes.string
  })
};

export { ChoiceGroup as default };
