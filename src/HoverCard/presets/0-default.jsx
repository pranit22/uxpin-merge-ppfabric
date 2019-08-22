import * as React from 'react';
import { HoverCard } from 'office-ui-fabric-react/lib/HoverCard';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DetailsList, buildColumns } from 'office-ui-fabric-react/lib/DetailsList';
import { createListItems } from 'office-ui-fabric-react/lib/utilities/exampleData';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
const classNames = mergeStyleSets({
    compactCard: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    expandedCard: {
        padding: '16px 24px'
    },
    item: {
        selectors: {
            '&:hover': {
                textDecoration: 'underline',
                cursor: 'pointer'
            }
        }
    }
});
export class HoverCardBasicExample extends React.Component {
    constructor() {
        super(...arguments);
        this._items = createListItems(10);
        this._columns = this._buildColumns();
        this._onRenderItemColumn = (item, index, column) => {
            const expandingCardProps = {
                onRenderCompactCard: this._onRenderCompactCard,
                onRenderExpandedCard: this._onRenderExpandedCard,
                renderData: item
            };
            if (column.key === 'location') {
                return (<HoverCard expandingCardProps={expandingCardProps} instantOpenOnClick={true}>
          <div className={classNames.item}>{item.location}</div>
        </HoverCard>);
            }
            return item[column.key];
        };
        this._onRenderCompactCard = (item) => {
            return (<div className={classNames.compactCard}>
        <a target="_blank" href={`http://wikipedia.org/wiki/${item.location}`}>
          {item.location}
        </a>
      </div>);
        };
        this._onRenderExpandedCard = (item) => {
            return (<div className={classNames.expandedCard}>
        {item.description}
        <DetailsList setKey="expandedCardSet" items={this._items} columns={this._columns}/>
      </div>);
        };
    }
    render() {
        return (<Fabric>
        <p>
          Hover over the <i>location</i> cell of a row item to see the card or use the keyboard to navigate to it.
        </p>
        <p>When using the keyboard to tab to it, the card will open but navigation inside of it will not be available.</p>
        <DetailsList setKey="hoverSet" items={this._items} columns={this._columns} onRenderItemColumn={this._onRenderItemColumn}/>
      </Fabric>);
    }
    _buildColumns() {
        return buildColumns(this._items).filter(column => column.name === 'location' || column.name === 'key');
    }
}

export default HoverCardBasicExample;
