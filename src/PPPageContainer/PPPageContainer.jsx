import * as React from 'react';
import PPHorizontalStack from '../PPHorizontalStack/PPHorizontalStack';
import * as PropTypes from 'prop-types';



class PPPageContainer extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <PPHorizontalStack
                uxpId='stck2'
                gutterPadding={0}
                widths={`auto\nauto`}
                showInstructions={false}
                stackHeight='100%'
                vAlign="stretch"
            >
                {this.props.children}
            </PPHorizontalStack>
        );
    }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
PPPageContainer.propTypes = {

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
PPPageContainer.defaultProps = {

}


export { PPPageContainer as default };