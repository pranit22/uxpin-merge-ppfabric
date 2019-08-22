import * as React from 'react';
import { GroupedList } from 'office-ui-fabric-react/lib/components/GroupedList/index';
import { DetailsRow } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsRow';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Selection, SelectionMode, SelectionZone } from 'office-ui-fabric-react/lib/utilities/selection/index';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { createListItems, createGroups } from 'office-ui-fabric-react/lib/utilities/exampleData';
const groupCount = 3;
const groupDepth = 3;
export class GroupedListBasicExample extends React.Component {
    constructor(props) {
        super(props);
        this._onRenderCell = (nestingDepth, item, itemIndex) => {
            return (<DetailsRow columns={this._columns} groupNestingDepth={nestingDepth} item={item} itemIndex={itemIndex} selection={this._selection} selectionMode={SelectionMode.multiple} compact={this.state.isCompactMode}/>);
        };
        this._onChangeCompactMode = (ev, checked) => {
            this.setState({ isCompactMode: checked });
        };
        this._items = createListItems(Math.pow(groupCount, groupDepth + 1));
        this._columns = Object.keys(this._items[0])
            .slice(0, 3)
            .map((key) => ({
            key: key,
            name: key,
            fieldName: key,
            minWidth: 300
        }));
        this._groups = createGroups(groupCount, groupDepth, 0, groupCount);
        this._selection = new Selection();
        this._selection.setItems(this._items);
        this.state = {
            isCompactMode: false
        };
    }
    render() {
        const { isCompactMode } = this.state;
        return (<div>
        <Toggle label="Enable compact mode" checked={isCompactMode} onChange={this._onChangeCompactMode} onText="Compact" offText="Normal" styles={{ root: { marginBottom: '20px' } }}/>
        <FocusZone>
          <SelectionZone selection={this._selection} selectionMode={SelectionMode.multiple}>
            <GroupedList items={this._items} onRenderCell={this._onRenderCell} selection={this._selection} selectionMode={SelectionMode.multiple} groups={this._groups} compact={isCompactMode}/>
          </SelectionZone>
        </FocusZone>
      </div>);
    }
}

export default GroupedListBasicExample;
