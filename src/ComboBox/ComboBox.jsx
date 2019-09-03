import { ComboBox as FComboBox, SelectableOptionMenuItemType } from 'office-ui-fabric-react';
import * as React from 'react';
import * as PropTypes from 'prop-types';

/**
 * @uxpinwrappers
 * SkipContainerWrapper, NonResizableWrapper
 */


function onMenuOpen (event){
    console.log(event)
}

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
            onMenuOpen={onMenuOpen.bind(this)}>
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
     
    /** Called when Select is opened */
    onMenuOpen: PropTypes.func
};

ComboBox.defaultProps = {
    label: "ComboBox label (clear to remove)",
    width: 300,
    items: "Apple,Banana,Orange,Grape"
};

ComboBox.Header = SelectableOptionMenuItemType.Header
ComboBox.Divider = SelectableOptionMenuItemType.Divider


export { ComboBox as default };
