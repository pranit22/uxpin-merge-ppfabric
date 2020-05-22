import * as React from 'react';
import PPVerticalStack from '../PPVerticalStack/PPVerticalStack';
import * as PropTypes from 'prop-types';



class PPPage extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <PPVerticalStack
                uxpId='stck3'
                showInstructions={false}
                stackHeight='100%'
                spanChild={true}
                childSpannerIndex={2}
                stretch={true}
                >
                {this.props.children}
            </PPVerticalStack>
        );
    }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
PPPage.propTypes = {

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
PPPage.defaultProps = {

}


export { PPPage as default };