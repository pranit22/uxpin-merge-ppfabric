import { ChoiceGroup as FChoiceGroup } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';

function ChoiceGroup(props) {
  return (
    <FChoiceGroup options={props.choices.split(',').map(text => ({text, key:text}))} {...props}/>
  );
}

ChoiceGroup.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  /**
   * @uxpincontroltype textfield(2)
   * */
  choices: PropTypes.string,
  defaultSelectedKey: PropTypes.string
};

ChoiceGroup.defaultProps = {
  label: 'ChoiceGroup (remove to clear label)',
  choices: 'one,two,three,four',
  defaultSelectedKey: 'one'
};

export { ChoiceGroup as default };
