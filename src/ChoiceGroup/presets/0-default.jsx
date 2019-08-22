import * as React from 'react';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
export class ChoiceGroupBasicExample extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = (ev, option) => {
            console.dir(option);
        };
        this.state = {
            imageKey: ''
        };
    }
    render() {
        return (<div>
        <ChoiceGroup className="defaultChoiceGroup" defaultSelectedKey="B" options={[
            {
                key: 'A',
                text: 'Option A',
                'data-automation-id': 'auto1'
            },
            {
                key: 'B',
                text: 'Option B'
            },
            {
                key: 'C',
                text: 'Option C',
                disabled: true
            },
            {
                key: 'D',
                text: 'Option D',
                disabled: true
            }
        ]} onChange={this._onChange} label="Pick one" required={true}/>
      </div>);
    }
}

export default ChoiceGroupBasicExample;
