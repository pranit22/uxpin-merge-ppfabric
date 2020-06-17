import * as React from 'react';
import {
    Stack
} from 'office-ui-fabric-react';

import * as PropTypes from 'prop-types';



class PPLayout extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {


        const topStackItemStyles = {
            root: {
                display: 'flex',
                width: this.props.width,
                height: this.props.height,
                overflow: 'auto'
            },
        };
        return (
            <Stack
                styles={topStackItemStyles}
            >
                {this.props.children}
            </Stack>
        );
    }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
PPLayout.propTypes = {

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
PPLayout.defaultProps = {
    width: 1440,
    height: 768
}


export { PPLayout as default };