import { Text as FText } from 'office-ui-fabric-react';
import { mergeStyles } from '@uifabric/merge-styles';
import * as PropTypes from 'prop-types';
import * as React from 'react';


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


class Text extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
      }
  }


  render() {

    //Convert the PPUI color palette string into something Microsoft can use. 
    let c = this.props.color.trim();
    let color = `var(--color-${c})`;
    let colorStyle = mergeStyles({
      color: color
    });

    //Calculate whether we need to set bold or italic props
    const spanStyle = {
      fontWeight: this.props.bold ? 'bold' : 'normal',
      fontStyle: this.props.italic ? 'italic' : 'normal',
    }

    return (

        <FText
            {...this.props}
            className={ colorStyle }
            variant = { this.props.size }
            nowrap = { !this.props.wrap }>
            <span style = { spanStyle } >{ this.props.value }</span>
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
   * @uxpindescription To allow text wrapping
   * @uxpinpropname Wrap Text
   */
  wrap: PropTypes.bool,

  /**
   * @uxpindescription Specify a color using the PayPal UI color values, such as 'grey-700' 
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
  wrap: true,
  color: 'grey-700'
};



export { Text as default };
