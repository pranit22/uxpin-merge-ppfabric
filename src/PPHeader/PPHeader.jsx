import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Pivot, PivotItem, TextField, Text, TooltipHost, ActionButton } from 'office-ui-fabric-react';
import { mergeStyles } from '@uifabric/merge-styles';
import { csv2arr } from '../_helpers/parser.jsx'


import './index.scss';
import Persona from '../Persona/Persona'
import Drawer from './Drawer/index.jsx'



class PPHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: null,
            breadcrumbs: [],
            menuItems: ['Projects', 'Products', 'Favorites']
        }
    }

    componentDidMount() {
        this.setState({ breadcrumbs: csv2arr(this.props.breadcrumbs).flat().map(v => v.trim()) })
    }

    onMenuClick(elm) {
        let index = this.state.menuItems.indexOf(elm.props.itemKey) + 1;
        let text = elm.props.headerText
        this.setState({ open: text === 'Dashboard' ? null : text }, () => {
            if (this.props[`onMenu${index}Click`]) this.props[`onMenu${index}Click`]()
        })
    }

    onCloseClick() {
        this.setState({ open: null })
    }

    onDocumentationClick() {
        if (this.props[`onDocumentationClick`]) this.props[`onDocumentationClick`]()
    }

    render() {
        let selectedKey = null
        let p = this.props
        let s = this.state
        if (s.menuItems[this.props.selectedIndex - 1] && p.selectedIndex !== '') selectedKey = s.menuItems[p.selectedIndex - 1]
        if (s.open) selectedKey = s.open
        return (
            <div className="PPHeaderComponent" style={{ backgroundColor: 'white' }}>
                <Drawer
                    open={s.open}
                    onCloseClick={this.onCloseClick.bind(this)}
                    productName={p.productName}
                    breadcrumbs={s.breadcrumbs}
                    onDocumentationClick={this.onDocumentationClick.bind(this)}
                />

                <div className="logo" onClick={p.onLogoClick}>
                    <div className="logoImg"></div>
                    <Text key="logo" className="logoTitle" variant='large'>Console</Text>
                </div>

                <div className="menu ">
                    <Pivot onLinkClick={this.onMenuClick.bind(this)} selectedKey={selectedKey}>
                        {s.menuItems.map(item => <PivotItem headerText={item} key={item} itemKey={item}></PivotItem>)}
                    </Pivot>
                </div>

                <div className="search">
                    <TextField placeholder="Do it all..." iconProps={{ iconName: 'Search' }} />
                </div>

                <div className="bar">
                    <ActionButton
                        onClick={() => { p.onTool1Click() }}
                        iconProps={{ iconName: 'Ringer' }} >
                    </ActionButton>
                    <ActionButton
                        onClick={() => { p.onTool2Click() }}
                        iconProps={{ iconName: 'EmojiNeutral' }}>
                    </ActionButton>
                    <ActionButton
                        onClick={() => { p.onTool3Click() }}
                        iconProps={{ iconName: 'Unknown' }} >
                    </ActionButton>
                    <Persona onClick={() => { p.onPersonaClick() }}
                        size="size24" presence="none" hidePersonaDetails />
                </div>

            </div >
        )
    }
}

PPHeader.propTypes = {
    productName: PropTypes.string,
    breadcrumbs: PropTypes.string,

    /** Which element number should be selected from 1 to n */
    selectedIndex: PropTypes.number,

    /** @uxpinpropname Logo click */
    onLogoClick: PropTypes.func,

    /** @uxpinpropname Menu 1 click */
    onMenu1Click: PropTypes.func,

    /** @uxpinpropname Menu 2 click */
    onMenu2Click: PropTypes.func,

    /** @uxpinpropname Menu 3 click */
    onMenu3Click: PropTypes.func,

    /** @uxpinpropname Tool 1 click */
    onTool1Click: PropTypes.func,

    /** @uxpinpropname Tool 2 click */
    onTool2Click: PropTypes.func,

    /** @uxpinpropname Tool 3 click */
    onTool3Click: PropTypes.func,

    /** @uxpinpropname Persona click */
    onPersonaClick: PropTypes.func,

    /** @uxpinpropname Documentation click */
    onDocumentationClick: PropTypes.func,
};

PPHeader.defaultProps = {
    productName: 'Product name',
    breadcrumbs: 'Topics, Create Topic',
    selectedIndex: 1
}

export { PPHeader as default };
