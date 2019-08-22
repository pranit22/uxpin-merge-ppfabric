import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
export class CheckboxBasicExample extends React.Component {
    constructor(props) {
        super(props);
        this._onCheckboxChange = this._onCheckboxChange.bind(this);
    }
    render() {
        return (<div>
        <Checkbox label="Standard checkbox" onChange={this._onCheckboxChange}/>
      </div>);
    }
    _onCheckboxChange(ev, isChecked) {
        console.log(`The option has been changed to ${isChecked}.`);
    }
}

export default CheckboxBasicExample;
