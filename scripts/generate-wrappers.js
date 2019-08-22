const fs = require('fs-extra');
const path = require('path');

const libraryTarget = 'office-ui-fabric-react';
const targetPath = path.resolve(__dirname, '../', `node_modules/${libraryTarget}/lib`);
const librarySrcPath = path.resolve(__dirname, '../', `node_modules/${libraryTarget}/src`);
// read the list of components
const dirItems = fs.readdirSync(targetPath).filter(file => file.match(/\.js/)).map(file => file.split('.')[ 0 ]);
const sourcePrefix = path.resolve(__dirname, '../', 'src');
const ts = require('typescript');

// remove the source directory
fs.emptyDirSync(sourcePrefix);

dirItems.forEach(component => {

  // create a local folder
  const componentDir = `${sourcePrefix}/${component}`;
  const presetDir = `${sourcePrefix}/${component}/presets`;

  const componentTemplate = `import {${component}} from '${libraryTarget}';
export default ${component};
`;

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

  const indexTemplate = dirItems.reduce((tpl, file) => {
    tpl += `export * from './${file}/${file}'\n`;
    return tpl;
  }, '');

  const docTemplate = `# ${component}
  
\`\`\`jsx
<${component} />
\`\`\`
  
 `;

  switch (component) {
    case 'index':
    // we need to generate this one ourselves at the end!
    // noop
    default:
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
        }catch(e){
          // noop
        }
        return file;
      }, null);

      let jsx = `import * as React from 'react';
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
      fs.writeFileSync(`${componentDir}/${component}.js`, componentTemplate);

      // write component doc stub
      fs.writeFileSync(`${componentDir}/${component}.md`, docTemplate);
  }

  // generate the index file
  const indexPath = `${sourcePrefix}/index.js`;
  fs.ensureFileSync(indexPath);
  fs.writeFileSync(indexPath, indexTemplate);

  // write the UXPin wrapper component
  const wrapperPath = `${sourcePrefix}/UXPinWrapper/UXPinWrapper.js`;
  fs.ensureFileSync(wrapperPath);
  fs.writeFileSync(wrapperPath, wrapperTemplate);

});
