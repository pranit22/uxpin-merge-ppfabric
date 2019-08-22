import * as React from 'react';
import * as styles from './Layer.Example.scss';
import { AnimationClassNames } from 'office-ui-fabric-react/lib/Styling';
import { BaseComponent, css } from 'office-ui-fabric-react/lib/Utilities';
import { Layer } from 'office-ui-fabric-react/lib/Layer';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
const LayerBasicExampleContext = React.createContext({ message: undefined });
class LayerContentExample extends BaseComponent {
    constructor() {
        super(...arguments);
        this.state = {
            time: new Date().toLocaleTimeString()
        };
    }
    componentDidMount() {
        this._async.setInterval(() => {
            this.setState({
                time: new Date().toLocaleTimeString()
            });
        }, 1000);
    }
    render() {
        return (<LayerBasicExampleContext.Consumer>
        {value => (<div className={css(styles.content, AnimationClassNames.scaleUpIn100)}>
            <div className={styles.textContent}>{value.message}</div>
            <div>{this.state.time}</div>
          </div>)}
      </LayerBasicExampleContext.Consumer>);
    }
}
export class LayerBasicExample extends BaseComponent {
    constructor() {
        super(...arguments);
        this.state = {
            showLayer: false
        };
        this._onChange = (ev, checked) => {
            this.setState({ showLayer: checked });
        };
    }
    render() {
        const { showLayer } = this.state;
        return (<LayerBasicExampleContext.Provider value={{
            message: 'Hello world.'
        }}>
        <div>
          <Toggle label="Wrap the content box below in a Layer" inlineLabel checked={showLayer} onChange={this._onChange}/>

          {showLayer ? (<Layer>
              <LayerContentExample />
            </Layer>) : (<LayerContentExample />)}
        </div>
      </LayerBasicExampleContext.Provider>);
    }
}

export default LayerBasicExample;
