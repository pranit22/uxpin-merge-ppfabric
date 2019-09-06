import * as React from 'react';

import ComboBox from '../ComboBox';

export default (
    <ComboBox
        multiSelect
        uxpId="ComboBox1"
        defaultSelectedKey="Banana"
        label="ComboBox label"
        allowFreeform
        autoComplete="on"
        items="Apple,Banana,Orange,Grape"
        width={300}
        placeholder="Select or type an option" />
)

