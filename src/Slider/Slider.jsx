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
        
    });
  }

  render() {
    return (
      <>
        {this.props.vertical ? (
          <FSlider
            label={this.props.label}
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            onChange={(value) => console.log(value)}
            className={this.getSliderClasses()}
            vertical
            {...this.props}
          />
        ) : (
          <FSlider
            label={this.props.label}
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            onChange={(value) => console.log(value)}
            className={this.getSliderClasses()}
            {...this.props}
          />
        )}
      </>
    );
  }
}

Slider.propTypes = {
  label: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  vertical: PropTypes.bool,
  onChange: PropTypes.func
};

Slider.defaultProps = {
  label: "Basic Slider",
  min: 0,
  max: 10,
  step: 1,
  vertical: false
};

export { Slider as default };
