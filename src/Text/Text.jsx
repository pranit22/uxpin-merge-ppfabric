import { Text as FText } from 'office-ui-fabric-react';
import { mergeStyles } from '@uifabric/merge-styles';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { TpxUxColors } from '../_helpers/tpxuxcolorutils.jsx';



  /**
   * UPDATED April 24, 2020 by Anthony Hand
   * - Fixed issue where when one nudged the text up or down a pixel, the control would a) sometimes move 3 pixels, 
   *      and b) sometimes move the opposite direction instead. 
   * - Fixed issue where the line height was too short. If the text was larger and multi-line, 
   *      the line height would appear to be <1, with text overlapping. 
   * */

  /**
   * UPDATED Mar 30, 2020 by Anthony Hand
   * - Added optional bold and italic styling options. These apply to the whole control.
   * - Simplified the method for setting a color. Now it's just a PayPal UI token, such as "blue-700". 
   * - Converted the control to a class rather than a function.
   * - Removed the block property. It wasn't useful. 
   * - Improvements in sizing at design time in UXPin. It's still awkward, but a little less so. 
   * - Added descriptions and prop names for each property with some updates. Changed some prop names.
   * 
   * TODOs
   * - Add support for tokenized text with link() and icon(IconName) features.
   * 
   * */


//Use this color if the UXPin user doesn't enter a valid hex or PPUI color token.
const defaultTextColor = "#000000";


class Text extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
      }
  }


  render() {

    //Let's see if the user entered a valid color value. This method returns undefined if not. 
    var textColor = TpxUxColors.getHexFromHexOrPpuiToken(this.props.color);
    if (!textColor) {
      textColor = defaultTextColor;
    }

    let fTextStyles = {
      root: {
        color: textColor,
        fontWeight: this.props.bold ? 'bold' : 'normal',
        fontStyle: this.props.italic ? 'italic' : 'normal',
        display: 'block',         //Fixes the 'nudge up/down' issues for larger and smaller sizes
        lineHeight: 'normal',     //Fixes the janked line height issues for larger and smaller sizes,
        textAlign: this.props.align
      }
    }
    

    return (

        <FText
            {...this.props}
            styles = { fTextStyles }
            variant = { this.props.size }
            nowrap = { this.props.truncate }>
              { this.props.value }
        </FText>
    );
  }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Text.propTypes = {

  /**
   * @uxpindescription The text value to display
   * @uxpincontroltype textfield(6)
   */
  value: PropTypes.string,

  /**
   * @uxpindescription The display size, corresponding to a Microsoft Text 'Variant'
   */
  size: PropTypes.oneOf([
    'tiny',
    'xSmall',
    'small',
    'smallPlus',
    'medium',
    'mediumPlus',
    'large',
    'xLarge',
    'xxLarge',
    'mega',
  ]),

  /**
   * @uxpindescription To apply bold formatting
   */
  bold: PropTypes.bool,

  /**
   * @uxpindescription To apply italic formatting
   */
  italic: PropTypes.bool,

  /**
   * @uxpindescription Text alignment
   */
  align: PropTypes.oneOf(['left', 'center', 'right']),

  /**
   * @uxpindescription To restrict the Text to a single line, truncating any extra with ellipses. If unchecked, you can manually set the width and height. 
   * @uxpinpropname Truncate Text
   */
  truncate: PropTypes.bool,

  /**
   * @uxpindescription Specify a text color with a Hex or PayPal UI color token, such as '#ffffff' or 'blue-700'. 
   */
  color: PropTypes.string
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Text.defaultProps = {
  value: 'The quick brown fox jumped over the lazy dog.',
  size: 'medium',
  bold: false,
  italic: false,
  align: 'left',
  truncate: false,
  color: 'grey-700',

};



export { Text as default };
