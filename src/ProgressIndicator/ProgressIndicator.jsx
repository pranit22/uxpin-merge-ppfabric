import * as React from 'react';
import { ProgressIndicator as FProgressIndicator } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import { mergeStyles } from '@uifabric/merge-styles';
import { getTokens } from '../_helpers/parser.jsx'


/**
 * UPDATED Mar 22, 2020 by Anthony Hand
 * - Added the indeterminate mode property.
 */

/**
 * UPDATED Mar 16, 2020 by Anthony Hand
 * - Swapped out color based status names to role-based status names.
 * - Created constants for the role colors, and updated them with PPUI colors. Integrated constants into the merge styles function.
 * - Updated the icon colors to match the role colors. 
 * - Added descriptions and prop names for each property with some updates. 
 * 
 * For additional outstanding issues, please see: 
 *    https://github.paypal.com/Console-R/uxpin-merge-ms-fabric/issues/104
 *    
 * */


/** PPUI Blue 600 */
const defaultBlue = '#0070BA';

/** PPUI Green 600 */
const successGreen = '#299976';
const successIcon = 'icon(Completed|color-green-600)';

/** PPUI Orange 500  */
const warningYellow = '#FF9600';
const warningIcon = 'icon(Warning|color-orange-500)';

/** PPUI Red 500 */
const errorRed = '#D20000';
const errorIcon = 'icon(Error|color-red-500)';


class ProgressIndicator extends React.Component {

  constructor(props) {
    super(props);
  }

  set() {
    this.setState({
      _percent: this.props.percent
    })
  } 

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.percent !== this.props.percent
    ) {
      this.set();
    }
  }

  getProgressIndicatorClasses() {

    return mergeStyles({
      selectors: {
        '& .ms-ProgressIndicator-progressTrack': {
          borderRadius: 100
        },
        '& .ms-ProgressIndicator-progressBar': {
          height: 6,
          width: 50,
          backgroundColor: this.props.status === 'Success' ? successGreen
            : this.props.status === 'Warning' ? warningYellow
              : this.props.status === 'Error' ? errorRed
                : defaultBlue,
          borderRadius: 100
        }
      }
    })
  }

  getDescription(status, desc) {

    let icon = status === 'Success' ? successIcon
      : status === 'Warning' ? warningIcon
        : status === 'Error' ? errorIcon
          : ''

    let descriptionText = icon + ' ' + desc;

    let description = getTokens(descriptionText).mixed ? getTokens(descriptionText).mixed
      .map((el, i) => typeof el === 'string' ?
        <span key={i}> {el} </span> :
        el.suggestions[0]())
      :
      getTokens(descriptionText).text

    return description;
  }


  //Determine what value to set as the progress indicator's value, if at all. 
  _getValidatedPercent() {

    //Set the default to undefined. We'll use it if it's in indeterminate mode. 
    var percent = undefined;

    //If it's not indeterminate mode, let's find out what this value should be. 
    if (!this.props.indeterminate) {
      percent = parseFloat(this.state._percent);

      //If it's not a number, set it to 0
      if (isNaN(percent)) {
        percent = 0;
      }

      //Check for min
      if (percent < 0) {
        percent = 0;
      }

      //Check for max
      if (percent > 1) {
        percent = 1.0;
      }
    }

    //Return the final value
    return percent;
  }


  render() {

    //Get a validated percentage value
    const percent = this._getValidatedPercent()

    //Calculate the description
    const description = this.getDescription(this.props.status, this.props.descriptionText);

    return (
      <FProgressIndicator
        percentComplete={percent}
        barHeight={6}  //TODO: Should this be hard coded?
        className={this.getProgressIndicatorClasses()}
        description={description}
        {...this.props} />
    );
  }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
ProgressIndicator.propTypes = {

  /**
   * @uxpindescription Reflect the control's role in the UI with its visual style
   * @uxpinpropname Role
   * */
  status: PropTypes.oneOf(['Default', 'Success', 'Warning', 'Error']),

  /**
   * @uxpindescription The description text to reflect the percent complete.
   * @uxpinpropname Description
   * */
  descriptionText: PropTypes.string,

  /**
   * @uxpindescription Use a value between 0 - 1.0
   * @uxpinpropname Percent
   * */
  percent: PropTypes.string,

  /**
   * @uxpindescription To display in indeterminate mode rather than show a percent
   * @uxpinpropname Indeterminate
   * */
  indeterminate: PropTypes.bool
}


/**
 * Set the default values.
 * 
 */
ProgressIndicator.defaultProps = {
  status: 'Default',
  percent: "0.5",
  descriptionText: "Progress info",
  indeterminate: false
}


export { ProgressIndicator as default };
