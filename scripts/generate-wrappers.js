const fs = require('fs-extra');
const path = require('path');
const { difference, uniq } = require('lodash');

const libraryTarget = 'office-ui-fabric-react';
const targetPath = path.resolve(__dirname, '../', `node_modules/${libraryTarget}/lib`);
const librarySrcPath = path.resolve(__dirname, '../', `node_modules/${libraryTarget}/src`);
const sourcePrefix = path.resolve(__dirname, '../', 'src');
const ts = require('typescript');

// remove the source directory
// stop doing so we don't lose customizations :)
fs.emptyDirSync(sourcePrefix);

const fabricBlacklist = [
  'Button',
  'Check',
  'Color',
  'Fabric',
  'FocusZone',
  'FocusTrapZone',
  'Foundation',
  'index',
  'Icons',
  'image',
  'Image',
  'KeytipData',
  'KeytipLayer',
  'Layer',
  'MarqueeSelection',
  'Overlay',
  'PositioningContainer',
  'Stack',
  'Sticky',
  'Styling',
  'tsdoc-metadata',
  'version',
  'Theme',
  'ThemeGenerator',
  'Text',
  'Utilities',
];

const rawDirList = uniq(fs.readdirSync(targetPath).filter(file => file.match(/\.js/)).map(file => file.split('.')[ 0 ]));

// read the list of components
const dirItems = difference(rawDirList, fabricBlacklist);

const indexTemplate = dirItems.reduce((tpl, file) => {
  tpl += `export * from './${file}/${file}'\n`;
  return tpl;
}, '');

const wrapperTemplate = `import * as React from 'react';
import { loadTheme } from 'office-ui-fabric-react';
import '@paypalcorp/console.pp-fabric/dist/pp-fabric-tokens.css';
import {light} from '@paypalcorp/console.pp-fabric/dist/theme';

// load the theme from node_modules
loadTheme(light);

export default function UXPinWrapper({ children }) {
  return children;
}
`;

function generateComponent(component) {
  const componentDir = `${sourcePrefix}/${component}`;
  const presetDir = `${sourcePrefix}/${component}/presets`;

  const componentTemplate = `import * as React from 'react';
import {${component} as F${component}} from '${libraryTarget}';
import * as PropTypes from 'prop-types';

function ${component}(props) {
   return (
      <F${component} {...props}>{props.children}</F${component}>
  );
}

${component}.propTypes = {
    children: PropTypes.node,
};

export { ${component} as default };
`;

  const docTemplate = `# ${component}
  
\`\`\`jsx
<${component} />
\`\`\`
  
 `;

  // verify the component directory exists
  fs.ensureDirSync(componentDir);

  // verify the presets directory exists
  fs.ensureDirSync(presetDir);

  let exampleType = '';
  // load the example, looking for Basic, Default etc..
  const example = [ 'Basic', 'Default' ].reduce((file, exampleName) => {
    try {
      file = fs.readFileSync(librarySrcPath + '/components/' + component + `/examples/${component}.${exampleName}.Example.tsx`, 'UTF-8');
      exampleType = exampleName;
    } catch (e) {
      // noop
    }
    return file;
  }, null);

  let jsx = `import * as React from 'react';
import ${component} from '../${component}';

export default (
  <${component} uxpId="${component.toLowerCase()}1"/>
);
// TODO implement ${component} example
`;
  if (example) {
    jsx = ts.transpile(example, {
      jsx: 'preserve',
      "target": "es2015"
    });
    jsx += `
export default ${component}${exampleType}Example;
`;
  }

  fs.writeFileSync(`${presetDir}/0-default.jsx`, jsx);

  // write the component wrapper stub
  fs.writeFileSync(`${componentDir}/${component}.jsx`, componentTemplate);

  // write component doc stub
  fs.writeFileSync(`${componentDir}/${component}.md`, docTemplate);

}

dirItems.forEach(generateComponent);

// there are many types of buttons, so do a second loop for them..
[ 'ActionButton',
  'CommandBarButton',
  'CommandButton',
  'CompoundButton',
  'DefaultButton',
  'IconButton',
  'MessageBarButton',
  'PrimaryButton',
  'SplitButton' ].forEach((buttonComponent) => {
  generateComponent(buttonComponent)
});


// generate the index file
const indexPath = `${sourcePrefix}/index.js`;
fs.ensureFileSync(indexPath);
fs.writeFileSync(indexPath, indexTemplate);

// write the UXPin wrapper component
const wrapperPath = `${sourcePrefix}/UXPinWrapper/UXPinWrapper.js`;
fs.ensureFileSync(wrapperPath);
fs.writeFileSync(wrapperPath, wrapperTemplate);
