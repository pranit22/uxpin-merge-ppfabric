import * as React from "react";
import { Slider as FSlider } from "office-ui-fabric-react";
import * as PropTypes from "prop-types";
import { mergeStyles } from "@uifabric/merge-styles";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        
    }
  }

  getSliderClasses() {
    
    return mergeStyles({
        height: this.props.vertical ? 300 : 50,
        marginBottom: 8
    });
  }

  render() {
    return (
          <FSlider
            label={this.props.label}
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            defaultValue={this.props.defaultValue}
            onChange={(value) => console.log(value)}
            className={this.getSliderClasses()}
            showValue={true}
            vertical={this.props.vertical}
            {...this.props}
          />
    );
  }
}

Slider.propTypes = {
  label: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  vertical: PropTypes.bool,
  defaultValue: PropTypes.number,
  onChange: PropTypes.func
};

Slider.defaultProps = {
  label: "Basic Slider",
  min: 0,
  max: 10,
  step: 1,
  defaultValue: 2,
  vertical: false
};

export { Slider as default };
