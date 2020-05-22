import * as React from 'react';
import PPVerticalStack from '../PPVerticalStack/PPVerticalStack';
import * as PropTypes from 'prop-types';


class PPPageTemplate extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <PPVerticalStack
                uxpId='stck1'
                gutterPadding={0}
                showInstructions={false}
                stackHeight={`${this.props.height}px`}
                stackWidth={`${this.props.width}px`}
                spanChild={true}
                childSpannerIndex={2}
            >
                {this.props.children}
            </PPVerticalStack>
        );
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
PPPageTemplate.propTypes = {

    /**
     * Don't show this prop in the UXPin Editor. 
     * @uxpinignoreprop 
     * @uxpindescription Contents for the right side. 1. Drag an object onto the canvas. 2. In the Layers Panel, drag the item onto this object. Now it should be indented, and contained as a 'child.'  
     * @uxpinpropname Right Contents
     */
    children: PropTypes.node,

    /**
     * @uxpindescription The width of the layout 
     * @uxpinpropname Width
     */
    width: PropTypes.number,

    /**
     * @uxpindescription The height of the layout 
     * @uxpinpropname Height
     */
    height: PropTypes.number,


}


/**
 * Set the default values for this control in the UXPin Editor.
 */
PPPageTemplate.defaultProps = {
    width: 1440,
    height: 768
}


export { PPPageTemplate as default };