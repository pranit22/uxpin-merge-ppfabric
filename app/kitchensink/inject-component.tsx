import { Card } from '@uifabric/react-cards';
import { CheckboxVisibility, ConstrainMode, DetailsList, DetailsListLayoutMode, SelectionMode, Separator, Stack, Text } from 'office-ui-fabric-react';
import React, { Component, RefObject, Suspense } from 'react';
import { render } from 'react-dom';
import { default as metadata } from './metadata.json';

type Props = {
  match: {
    params: {
      name: string
    }
  }
}

export class InjectComponent extends Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  getComponentMetadata(name: string) {
    // @ts-ignore
    const {components} = metadata.categorizedComponents.find(category => category.components.find(component => component.name === name));
    return components.find((component: { name: string }) => component.name === name)
  }

  render() {
    const componentName = this.props.match.params.name;
    const Injected = React.lazy(() => import(
        /*
        webpackExclude: /(divider|extendedpicker|floatingpicker|pickers|selectableoption|selecteditemslist|ScrollablePane|splitbutton|documentcard|persona|nav|contextualmenu|datepicker|facepile|icon|link|modal)$/i,
        webpackChunkName: "component-",
        webpackMode: "eager"
        */
        `./components/${componentName}/presets/0-default.jsx`).then(module => {

        //because webpack modules are singletons, once you do this, its done "forever"
        // if you do it again, it will break things bec of double wrapping the component

        if (typeof module.default !== 'function') {

          // because UX Pin exports react elements from the presets instead of components..
          // I have to do this nasty business to wrap the element back into a component and monkey patch the module.default
          // this is the only way React.lazy will handle the module. :poop:
          const El = module.default;
          module.default = class Injectable extends Component {

            container: RefObject<HTMLDivElement>;

            constructor(props: {}) {
              super(props);
              this.container = React.createRef();
            }

            componentDidMount(): void {
              render(El, this.container.current);
            }

            render() {
              return (
                <div ref={this.container}>
                </div>
              )
            }
          };
        }
        return module;
      })
    );

    const meta = this.getComponentMetadata(componentName);

    const tabularProps = meta.properties.map((prop: any, idx: number) => ({
      key: idx,
      name: prop.name,
      description: prop.description,
      defaultValue: prop.defaultValue ? prop.defaultValue.value : undefined,
      required: prop.isRequired ? '*' : '',
      type: prop.type.name
    })).sort((p1: { name: string }, p2: { name: string }) => p1.name > p2.name);

    const columns = [
      {
        key: 'name',
        name: 'Name',
        fieldName: 'name',
        isResizeable: false,
        minWidth: 50,
        maxWidth: 125
      },
      {
        key: 'type',
        name: 'Type',
        fieldName: 'type',
        isResizeable: false,
        minWidth: 50,
        maxWidth: 50
      },
      {
        key: 'desc',
        name: 'Description',
        fieldName: 'description',
        isResizeable: false,
        minWidth: 50,
        maxWidth: 300
      },
      {
        key: 'default',
        name: 'Default',
        fieldName: 'defaultValue',
        isResizeable: false,
        minWidth: 150,
        maxWidth: 300
      }
    ];

    return (
      <div>
        <Suspense fallback={<Text>Loading...</Text>}>
          <Text variant={'xLarge'}>{componentName}</Text>
          <Separator />
          <Stack disableShrink tokens={{childrenGap: 25}}>
            <Stack.Item>
              <Card styles={{root: {padding: '1em'}}} tokens={{
                minWidth: 300
              }}>
                <Card.Item>
                  <Injected/>
                </Card.Item>
              </Card>
            </Stack.Item>
            <Stack.Item>
              <Text variant='large' block>Props</Text>
              <DetailsList items={tabularProps} columns={columns} compact={true} layoutMode={DetailsListLayoutMode.fixedColumns}
                           checkboxVisibility={CheckboxVisibility.hidden} selectionMode={SelectionMode.none} styles={{root: {maxWidth: '70%'}}}/>
            </Stack.Item>
          </Stack>
        </Suspense>
      </div>
    )
  }

}
