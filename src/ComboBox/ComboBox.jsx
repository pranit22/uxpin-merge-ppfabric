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
            dropdownWidth={props.width}>
            {props.children}
        </FComboBox>
    );
}

ComboBox.propTypes = {
    label: PropTypes.string,
    placeholder: "Select or type an option",
    allowFreeform: PropTypes.bool, 

    /**
     * Use "on" or "off" labels
     * @uxpindescription use "on" or "off" labels
     * */
    autoComplete: PropTypes.oneOf(['on', 'off']), 

    multiSelect: PropTypes.bool,
    width: PropTypes.number,
    errorMessage: PropTypes.string, 
    advancedOptions: PropTypes.object,
    /**
     * @uxpincontroltype textfield(3)
     * */
    items: PropTypes.string
};

ComboBox.defaultProps = {
    label: "ComboBox label (clear to remove)",
    width: 300,
    items: "Apple,Banana,Orange,Grape"
};

ComboBox.Header = SelectableOptionMenuItemType.Header
ComboBox.Divider = SelectableOptionMenuItemType.Divider


export { ComboBox as default };
