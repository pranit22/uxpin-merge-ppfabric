import * as React from 'react';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { OverflowSet } from 'office-ui-fabric-react/lib/OverflowSet';
const noOp = () => undefined;
export class OverflowSetBasicExample extends React.PureComponent {
    constructor() {
        super(...arguments);
        this._onRenderItem = (item) => {
            return (<Link styles={{ root: { marginRight: 10 } }} onClick={item.onClick}>
        {item.name}
      </Link>);
        };
        this._onRenderOverflowButton = (overflowItems) => {
            const buttonStyles = {
                root: {
                    minWidth: 0,
                    padding: '0 4px',
                    alignSelf: 'stretch',
                    height: 'auto'
                }
            };
            return <IconButton styles={buttonStyles} menuIconProps={{ iconName: 'More' }} menuProps={{ items: overflowItems }}/>;
        };
    }
    render() {
        return (<OverflowSet items={[
            {
                key: 'item1',
                name: 'Link 1',
                onClick: noOp
            },
            {
                key: 'item2',
                name: 'Link 2',
                onClick: noOp
            },
            {
                key: 'item3',
                name: 'Link 3',
                onClick: noOp
            }
        ]} overflowItems={[
            {
                key: 'item4',
                name: 'Overflow Link 1',
                onClick: noOp
            },
            {
                key: 'item5',
                name: 'Overflow Link 2',
                onClick: noOp
            }
        ]} onRenderOverflowButton={this._onRenderOverflowButton} onRenderItem={this._onRenderItem}/>);
    }
}

export default OverflowSetBasicExample;
