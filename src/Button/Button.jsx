import * as PropTypes from 'prop-types';
import * as React from 'react';
import { mergeStyles, mergeStyleSets } from '@uifabric/merge-styles';
import { PrimaryButton as FPrimaryButton, DefaultButton as FDefaultButton, IButtonStyles } from 'office-ui-fabric-react';



class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    let iconProps = { iconName: this.props.iconName }
    let styles = {
      root: {
        borderRadius: this.props.rounded ? 100 : 0
      },
    }
    if (this.props.iconPosition === "end") styles.flexContainer = {
      flexDirection: 'row-reverse'
    }
    return (
      <>
        {this.props.primary ?
          <FPrimaryButton  {...this.props}
            onClick={this.props.onClick}
            iconProps={iconProps}
            styles={styles} />
          :
          <FDefaultButton {...this.props}
            onClick={this.props.onClick}
            iconProps={iconProps}
            styles={styles}
          />
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
  iconPosition: PropTypes.oneOf(['start', 'end']),
  rounded: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  text: 'Button Name',
  primary: true,
  checked: false,
  disabled: false,
  rounded: true,
  // iconName: 'Dictionary',
  // iconPosition: 'end'
};

export { Button as default };
