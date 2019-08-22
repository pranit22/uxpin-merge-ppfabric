import * as React from 'react';
import { css, classNamesFunction, DefaultButton, Label, PrimaryButton } from 'office-ui-fabric-react';
const exampleStyles = {
    twoup: [
        'ms-BasicButtonsTwoUp',
        {
            display: 'flex',
            selectors: {
                '& > *': {
                    flexGrow: 1
                },
                '.ms-Label': {
                    marginBottom: '10px'
                }
            }
        }
    ]
};
const getClassNames = classNamesFunction();
const classNames = getClassNames(exampleStyles, {});
export class ButtonDefaultExample extends React.Component {
    render() {
        const { disabled, checked } = this.props;
        return (<div className={css(classNames.twoup)}>
        <div>
          <Label>Standard</Label>
          <DefaultButton data-automation-id="test" allowDisabledFocus={true} disabled={disabled} checked={checked} text="Standard Button" onClick={this._alertClicked}/>
        </div>
        <div>
          <Label>Primary</Label>
          <PrimaryButton data-automation-id="test" disabled={disabled} checked={checked} text="Primary Button" onClick={this._alertClicked} allowDisabledFocus={true}/>
        </div>
      </div>);
    }
    _alertClicked() {
        alert('Clicked');
    }
}

export default ButtonDefaultExample;
