import * as PropTypes from 'prop-types';
import * as React from 'react';
import { mergeStyles, mergeStyleSets } from '@uifabric/merge-styles';
import './index.scss'
import { PrimaryButton as FPrimaryButton, DefaultButton as FDefaultButton, IButtonStyles } from 'office-ui-fabric-react';



class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let iconProps = { iconName: this.props.iconName }
    let buttonClass = 'button' + (this.props.rounded ? ' rounded' : '')
    return (
      <>
        {this.props.primary ?
          <FPrimaryButton  {...this.props}
            onClick={this.props.onClick}
            iconProps={iconProps}
            className={buttonClass} />
          :
          <FDefaultButton {...this.props}
            onClick={this.props.onClick}
            iconProps={iconProps}
            className={buttonClass} />
        }
      </>

    );
  }

}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  iconName: PropTypes.string,
  rounded: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  text: 'Button Name',
  primary: true,
  checked: false,
  disabled: false,
  rounded: false
};

export { Button as default };
