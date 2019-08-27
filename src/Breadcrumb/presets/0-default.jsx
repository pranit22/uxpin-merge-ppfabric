import Breadcrumb from '../Breadcrumb';
import * as React from 'react';

export default (<Breadcrumb uxpId="breadcrumb1" items={[
  { text: 'Files', key: 'Files' },
  { text: 'This is folder 1', key: 'f1' },
  { text: 'This is folder 2 with a long name', key: 'f2' },
  { text: 'This is folder 3 long', key: 'f3' },
  { text: 'This is folder 4', key: 'f4' },
  { text: 'This is folder 5 another', key: 'f5', isCurrentItem: true } ]} />);
