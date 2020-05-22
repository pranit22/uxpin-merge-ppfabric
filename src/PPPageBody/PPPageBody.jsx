import * as React from 'react';
import PPVerticalStack from '../PPVerticalStack/PPVerticalStack';
import * as PropTypes from 'prop-types';
import _ from 'lodash';
import { Text } from 'office-ui-fabric-react';

//****************************
// Instructions to be shown when the stack is empty
const instructions = (
    <Text
        styles={{
            root: {
                color: "#000000",
                fontWeight: 'normal',
                fontStyle: 'normal',
                display: 'block',
                lineHeight: 'normal'
            }
        }}
        variant={'medium'}>
        To add content, navigate to PPPageBody control and drop elements to it.
    </Text>
);
//****************************


class PPPageBody extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <PPVerticalStack
                uxpId='stck4'
                internalPadding={24}
                showInstructions={false}
                stretch={true}
            >
                {_.isEmpty(this.props.children) && instructions}
                {this.props.children}
            </PPVerticalStack>
        );
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
PPPageBody.propTypes = {

    /**
     * Don't show this prop in the UXPin Editor. 
     * @uxpinignoreprop 
     * @uxpindescription Contents for the right side. 1. Drag an object onto the canvas. 2. In the Layers Panel, drag the item onto this object. Now it should be indented, and contained as a 'child.'  
     * @uxpinpropname Right Contents
     */
    children: PropTypes.node

}


/**
 * Set the default values for this control in the UXPin Editor.
 */
PPPageBody.defaultProps = {

}


export { PPPageBody as default };