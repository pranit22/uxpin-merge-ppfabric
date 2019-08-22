import * as React from 'react';
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { List } from 'office-ui-fabric-react/lib/List';
import { mergeStyleSets, getTheme, getFocusStyle } from '@uifabric/styling';
const theme = getTheme();
const { palette, semanticColors, fonts } = theme;
const classNames = mergeStyleSets({
    itemCell: [
        getFocusStyle(theme, { inset: -1 }),
        {
            minHeight: 54,
            padding: 10,
            boxSizing: 'border-box',
            borderBottom: `1px solid ${semanticColors.bodyDivider}`,
            display: 'flex',
            selectors: {
                '&:hover': { background: palette.neutralLight }
            }
        }
    ],
    itemImage: {
        flexShrink: 0
    },
    itemContent: {
        marginLeft: 10,
        overflow: 'hidden',
        flexGrow: 1
    },
    itemName: [
        fonts.xLarge,
        {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        }
    ],
    itemIndex: {
        fontSize: fonts.small.fontSize,
        color: palette.neutralTertiary,
        marginBottom: 10
    },
    chevron: {
        alignSelf: 'center',
        marginLeft: 10,
        color: palette.neutralTertiary,
        fontSize: fonts.large.fontSize,
        flexShrink: 0
    }
});
export class ListBasicExample extends React.Component {
    constructor(props) {
        super(props);
        this._onFilterChanged = this._onFilterChanged.bind(this);
        this.state = {
            filterText: '',
            items: props.items
        };
    }
    render() {
        const { items: originalItems } = this.props;
        const { items = [] } = this.state;
        const resultCountText = items.length === originalItems.length ? '' : ` (${items.length} of ${originalItems.length} shown)`;
        return (<FocusZone direction={FocusZoneDirection.vertical}>
        <TextField label={'Filter by name' + resultCountText} onChange={this._onFilterChanged}/>
        <List items={items} onRenderCell={this._onRenderCell}/>
      </FocusZone>);
    }
    _onFilterChanged(_, text) {
        const { items } = this.props;
        this.setState({
            filterText: text,
            items: text ? items.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0) : items
        });
    }
    _onRenderCell(item, index) {
        return (<div className={classNames.itemCell} data-is-focusable={true}>
        <Image className={classNames.itemImage} src={item.thumbnail} width={50} height={50} imageFit={ImageFit.cover}/>
        <div className={classNames.itemContent}>
          <div className={classNames.itemName}>{item.name}</div>
          <div className={classNames.itemIndex}>{`Item ${index}`}</div>
          <div>{item.description}</div>
        </div>
        <Icon className={classNames.chevron} iconName={getRTL() ? 'ChevronLeft' : 'ChevronRight'}/>
      </div>);
    }
}

export default ListBasicExample;
