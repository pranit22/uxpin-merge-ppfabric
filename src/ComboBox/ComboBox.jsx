import { ComboBox as FComboBox, SelectableOptionMenuItemType } from 'office-ui-fabric-react';
import * as React from 'react';
import * as PropTypes from 'prop-types';

/**
 * @uxpinwrappers
 * SkipContainerWrapper, NonResizableWrapper
 */

function ComboBox(props) {
    return (
        <FComboBox 
            {...props} 
            options={props.items
                .replace(/\s/g,'')
                .split(',')
                .map(text => ({key: text, text}))}
                styles={ {root: {width: props.width}} } 
            dropdownWidth={props.width} 
            defaultSelectedKey={props.defaultSelectedKey
                .replace(/\s/g,'')
                .split(',')}
            >
            {props.children}
        </FComboBox>
    );
}

ComboBox.propTypes = {
    /** Could be empty to remove label */
    label: PropTypes.string,

    placeholder: PropTypes.string,
    allowFreeform: PropTypes.bool, 

    /**
     * Use "on" or "off" labels
     * @uxpindescription use "on" or "off" labels
     * */
    autoComplete: PropTypes.oneOf(['on', 'off']), 

    multiSelect: PropTypes.bool,
    width: PropTypes.number,
    errorMessage: PropTypes.string, 

    /**
     * @uxpincontroltype textfield(3)
     * */
    items: PropTypes.string,
     
     /** Coma separated values to preselect */
    defaultSelectedKey: PropTypes.string,

    /** Triggered when Select is opened */
    onMenuOpen: PropTypes.func,

    /** Triggered when Select is focused */
    onFocus: PropTypes.func,

    /** Triggered when value is selected */
    onPendingValueChanged: PropTypes.func,

};

ComboBox.defaultProps = {
    label: "ComboBox label (clear to remove)",
    width: 300,
    items: "Apple,Banana,Orange,Grape"
};

ComboBox.Header = SelectableOptionMenuItemType.Header
ComboBox.Divider = SelectableOptionMenuItemType.Divider


export { ComboBox as default };
