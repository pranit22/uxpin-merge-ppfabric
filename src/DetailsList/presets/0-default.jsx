import * as React from 'react';
import DetailsList from '../DetailsList';

export default (
  <DetailsList
    uxpId="DetailsList1"
    columns={`Aa icon(CompassNW),  Bb, Cc link(link)`}
    items={
      `A-1, B-1, C-1 icon(CompassNW)
 A-2, B-2, C-2
 A-3, B-3, C-3`
    }
    isResizable />
)