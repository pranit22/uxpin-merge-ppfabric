import * as React from 'react';
import Nav from '../Nav';

const items = `icon(ViewAll) Aa 
"icon(Edit) B, b"
icon(Emoji2) Cc
Dd
Ee`;

export default (
    <Nav
        uxpId="nav1"
        items={items}
        disabled="2, 4"
    />
);
