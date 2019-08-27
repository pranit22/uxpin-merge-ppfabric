import * as React from 'react';
import ChoiceGroup from '../ChoiceGroup';

export default (<ChoiceGroup uxpId="choicegroup1" className="defaultChoiceGroup" defaultSelectedKey="B" options={[
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
]} label="Pick one" required={true}/>);
