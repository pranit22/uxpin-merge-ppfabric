import * as React from 'react';
import {
        Tooltip as FTooltip, 
        TooltipHost,
        DirectionalHint
    } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';


  /**
   * UPDATED April 2, 2020 by Anthony Hand
   * - Rewrote the JSX and 0-default.jsx files to follow template for adding a control a the UXPin library.
   * - Converted object to a class.
   * - Added file to our TPX UX Experimental library on UXPin.
   * 
   * TODOs
   * - Control needs to be updated with the proper PayPal UI theme. 
   * 
   * */


class Tooltip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }

        this._targetElm = React.createRef();
    }


    render() {

        return (
                <div>
                    <div //The control actually acting as the tooltip target. 
                                className="trigger"
                                ref={this._targetElm}
                                style={{
                                    display: 'inline-block', //required for tooltip host
                                    width: 10,
                                    height: 10,
                                    background: 'var(--color-blue-100)',
                    }} />
                    <FTooltip
                        {...this.props}
                        targetElement = {this._targetElm}
                        calloutProps = {{ hidden: !this.props.open,
                                        isBeakVisible: this.props.showBeak  }}
                        content = { this.props.text }
                        directionalHint = { DirectionalHint[this.props.direction] }
                    />
                </div>
        );
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Tooltip.propTypes = {

    /**
     * @uxpindescription Whether to display the Tooltlip 
     */   
    open: PropTypes.bool,

    /**
     * @uxpindescription Whether to show the 'beak' (or tip) of the Tooltlip 
     */   
    showBeak: PropTypes.bool,

    /**
     * @uxpindescription The main message text
     * @uxpincontroltype textfield(3)
     */
    text: PropTypes.string,

    /**
     * @uxpindescription The control's display direction
     * @uxpinpropname Hint Direction
     */
    direction: PropTypes.oneOf([
        "topLeftEdge",
        "topCenter",
        "topRightEdge",
        "topAutoEdge",
        "bottomLeftEdge",
        "bottomCenter",
        "bottomRightEdge", 
        "bottomAutoEdge",
        "leftTopEdge",
        "leftCenter",
        "leftBottomEdge",
        "rightTopEdge",
        "rightCenter",
        "rightBottomEdge"
    ]),
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Tooltip.defaultProps = {
    open: true,
    showBeak: true,
    text: "I'm a basic tooltip",
    direction: "bottomAutoEdge",
}


export { Tooltip as default };
