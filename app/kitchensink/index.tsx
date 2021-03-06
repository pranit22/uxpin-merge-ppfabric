import { CompoundButton, INavLinkGroup, Nav, Text } from 'office-ui-fabric-react';
import { Card } from '@uifabric/react-cards';
import React from 'react';
import { render } from 'react-dom';
import injectSheet, { Styles, ThemeProvider, WithStyles } from 'react-jss';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
// @ts-ignore
import UXPinWrapper from './components/UXPinWrapper/UXPinWrapper.js';
import { InjectComponent } from './inject-component';

const {components} = require('./manifest');


class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  render() {
    // @ts-ignore
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Text>React blew up! Open the JS console to learn more... (CMD+Option+K)</Text>;
    }

    return this.props.children;
  }
}


// build the metadata for the components
const styles = (theme: Styles) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '20% auto',
    gridTemplateRows: 'auto',
    gridTemplateAreas: '"nav content"',
    gridColumnGap: '1rem'
  },
  leftNav: {
    gridArea: 'nav'
  },
  content: {
    gridArea: 'content'
  }
});

const categories: Array<{ name: string, include: Array<string> }> = components.categories;

const componentList = categories.map((category: { name: string, include: Array<string> }): INavLinkGroup => {

  return {
    name: category.name, links: category.include.map(src => {
      const componentName = src.split('/')[ 1 ];
      return {name: componentName, url: `/component/${componentName}`, forceAnchor: false}
    })
  }
});


const FabricNav = withRouter(({history}) => (
  <div>
    <CompoundButton iconProps={{iconName: 'WebComponents'}} secondaryText="UXPin Fabric Components" styles={{root: {width: '100%', maxWidth: '100%'}}}
                    onClick={() => history.push('/')}>
      Kitchen Sink
    </CompoundButton>
    <Nav
      onLinkClick={(e, el) => {
        if (e && el) {
          e.preventDefault();
          history.push(el.url);
        }
      }}
      groups={componentList}/>
  </div>
));

const Page = ({classes}: WithStyles<typeof styles>) => (
  <div className={classes.container}>
    <div className={classes.leftNav}>
      <FabricNav/>
    </div>
    <div className={classes.content}>
      <Switch>
        <Route path="/component/:name" component={InjectComponent}/>
        <Route path="/" exact>
          <Text variant={'xLarge'}>Useful hints:</Text>
        <Card styles={{root: {padding: '1em'}}} tokens={{
                minWidth: '100%',
              }}>
          <Card.Item>
            <Text variant={'large'}>Select a component from the menu to view it's preset and metadata</Text>
          </Card.Item>
        </Card>
        <Card styles={{root: {padding: '1em'}}} tokens={{
                minWidth: '100%',
              }}>
          <Card.Item>
           <Text variant={'large'}>To index new component and make it available in Kitchensink run `npm run debug`</Text>
          </Card.Item>
        </Card>
        </Route>
      </Switch>
    </div>
  </div>
);

const StyledComp = injectSheet(styles)(Page);

const App = () => (
  <ThemeProvider theme={styles}>
    <StyledComp/>
  </ThemeProvider>
);

const root = document.body.appendChild(document.createElement('div'));

render(<ErrorBoundary>
  <BrowserRouter>
    <UXPinWrapper>
      <App/>
    </UXPinWrapper>
  </BrowserRouter>
</ErrorBoundary>, root);
