import * as React from 'react';
import {
        Spinner as FSpinner, 
        SpinnerSize
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


class Spinner extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        return (

            <FSpinner
                {...this.props}  //Props sends the label and position values directly
                size = { SpinnerSize[this.props.size] } //We need to explicitly send the size. 
            />
        );
    } //render
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Spinner.propTypes = {

  /**
   * @uxpindescription The label value to display next to the Spinner (optional)
   * @uxpincontroltype textfield(2)
   */
  label: PropTypes.string,

  /**
   * @uxpindescription The display size of the Spinner
   */
  size: PropTypes.oneOf([
    'xSmall',
    'small',
    'medium',
    'large',
  ]),
  
  /**
   * Send this value as a string. Don't send it as an enum, which would cause terminal errors. 
   * @uxpindescription Possible locations of the label in regards to the spinner
   * @uxpinpropname Label Position
   */
  labelPosition: PropTypes.oneOf([
    'top',
    'right',
    'bottom',
    'left',
  ]),

};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Spinner.defaultProps = {
    label: 'One moment...',
    size: 'medium', 
    labelPosition: 'bottom',
};



export { Spinner as default };
