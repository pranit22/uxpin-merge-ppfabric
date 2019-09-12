import * as React from 'react';
import Nav from '../Nav';

const items = `Aa
"B, b"
Cc
Dd
Ee`

export default (
    <Nav
        uxpId="nav1"
        items={items}
        disabled="2, 4"
    />
);