import { Pivot as FPivot, PivotItem, colGroupProperties } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import parse from 'csv-parse'

class Pivot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
      selectedIndex: this.props.selectedIndex
    }
  }

  componentDidMount() {
    this.setTabs()
  }

  setTabs(callback) {
    parse(this.props.tabs, {
      skip_empty_lines: true
    },
      (err, data) => {
        const tabs = data
          .flat()
          .map((val, i) => val)
        this.setState({ tabs }, callback)
      })
  }

  onLinkClick(element) {
    const selectedIndex = parseInt(element.key.replace(/\D+/g, '')) + 1;
    this.setState({ selectedIndex })
    if (this.props[`onLink${selectedIndex}Click`])
      this.props[`onLink${selectedIndex}Click`]()
  }
  render() {
    let s = this.state
    return (
      <div style={{ display: 'block' }}>
        {this.state.tabs.length > 0 ?
          <FPivot {...this.props}
            selectedKey={s.tabs[s.selectedIndex - 1]}
            onLinkClick={(e) => { this.onLinkClick(e); }} >
            {s.tabs.map((tab, idx) => (
              <PivotItem headerText={tab} itemKey={tab} key={idx} />
            ))}
          </FPivot>
          : null}
      </div>
    )
  }
}

Pivot.propTypes = {
  tabs: PropTypes.string.isRequired,
  selectedIndex: PropTypes.number,

  /** @uxpinpropname Link 1 click */
  onLink1Click: PropTypes.func,

  /** @uxpinpropname Link 2 click */
  onLink2Click: PropTypes.func,

  /** @uxpinpropname Link 3 click */
  onLink3Click: PropTypes.func,

  /** @uxpinpropname Link 4 click */
  onLink4Click: PropTypes.func,

  /** @uxpinpropname Link 5 click */
  onLink5Click: PropTypes.func,

  /** @uxpinpropname Link 6 click */
  onLink6Click: PropTypes.func,

  /** @uxpinpropname Link 7 click */
  onLink7Click: PropTypes.func,

  /** @uxpinpropname Link 8 click */
  onLink8Click: PropTypes.func,

  /** @uxpinpropname Link 9 click */
  onLink9Click: PropTypes.func
};

Pivot.defaultProps = {
  tabs: 'One,Two,Three',
  selectedIndex: 1
};

export { Pivot as default };
