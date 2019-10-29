import { Toggle as FToggle } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        
    }
  }

  render() {
    return (
          <FToggle  {...this.props} />
    );
  }
}

Toggle.propTypes = {
  onText: PropTypes.string.isRequired,
  offText: PropTypes.string.isRequired,
  defaultChecked: PropTypes.bool,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

Toggle.defaultProps = {
  onText: "On",
  offText: "Off",
  defaultChecked: true,
  label: "Toggle label",
  disabled: false
};

export { Toggle as default };
