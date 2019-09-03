import { ComboBox as FComboBox, SelectableOptionMenuItemType } from 'office-ui-fabric-react';
import * as React from 'react';
import * as PropTypes from 'prop-types';

function ComboBox(props) {
    return (
        <FComboBox {...props}>{props.children}</FComboBox>
    );
}

ComboBox.propTypes = {
    label: PropTypes.string,
    placeholder: "Select or type an option",
    allowFreeform: PropTypes.bool, 
    autoComplete: PropTypes.string, 
    options: PropTypes.array, 
    multiSelect: PropTypes.bool,
    dropdownWidth: PropTypes.number,
};

ComboBox.defaultProps = {
  label: "ComboBox label",
  dropdownWidth: 300
};

ComboBox.Header = SelectableOptionMenuItemType.Header
ComboBox.Divider = SelectableOptionMenuItemType.Divider


export { ComboBox as default };
