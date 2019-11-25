import * as React from 'react';
import { loadTheme } from 'office-ui-fabric-react';
import '@paypalcorp/console.pp-fabric/dist/styles/pp-fabric-normalize-tokens.css'
import { light } from '@paypalcorp/console.pp-fabric/dist/theme';
import { initializeIcons } from '@uifabric/icons';

initializeIcons();

// load the theme from node_modules
loadTheme(light);

export default function UXPinWrapper({ children }) {
  return children
}

// IF WE WILL DECIDE TO HAVE STRIPES ON ALL COMPONENTS IN DEBUG
// return <div style={{ position: 'relative' }}>
//   <div style={{
//     position: 'absolute',
//     zIndex: '999',
//     display: 'block',
//     height: '100%',
//     width: '100%',
//     pointerEvents: 'none',
//     background: `repeating-linear-gradient(
//         135deg,
//         rgba(244,67,54, .05),
//         rgba(244,67,54, .05) 10px,
//         rgba(77,20,16, 0) 10px,
//         rgba(77,20,16, 0) 20px
//       )`
//   }}></div>
//   {children}
// </div>;
