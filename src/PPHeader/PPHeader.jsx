import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Pivot, PivotItem, TextField, Text, TooltipHost, ActionButton } from 'office-ui-fabric-react';
import { mergeStyles } from '@uifabric/merge-styles';
import parse from 'csv-parse'


import './index.scss';
import { UtilitiesBarStyles } from './styles.ts'
import Persona from '../Persona/Persona'
import Drawer from './Drawer/index.jsx'



class PPHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: null,
            breadcrumbs: [],
            menuItems: ['Code Projects', 'Products', 'Favorites']
        }
    }

    componentDidMount() {
        parse(this.props.breadcrumbs, { skip_empty_lines: true },
            (err, data) => {
                this.setState({ breadcrumbs: data.flat().map(v => v.trim()) })
            })
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
    render() {
        let selectedKey = null
        if (this.state.menuItems[this.props.selectedIndex - 1] && this.props.selectedIndex !== '') selectedKey = this.state.menuItems[this.props.selectedIndex - 1]
        if (this.state.open) selectedKey = this.state.open
        return (
            <div className="PPHeaderComponent" style={{ backgroundColor: 'white' }}>
                <Drawer
                    open={this.state.open}
                    onCloseClick={this.onCloseClick.bind(this)}
                    productName={this.props.productName}
                    breadcrumbs={this.state.breadcrumbs}
                    onDocumentationClick={this.props.onDocumentationClick}
                />

                <div className="logo">
                    <div className="logoImg"></div>
                    <Text key="logo" className="logoTitle" variant='large'>Console</Text>
                </div>

                <div className="menu ">
                    <Pivot onLinkClick={this.onMenuClick.bind(this)} selectedKey={selectedKey}>
                        {this.state.menuItems.map(item => <PivotItem headerText={item} key={item} itemKey={item}></PivotItem>)}
                    </Pivot>
                </div>

                <div className="search">
                    <TextField placeholder="Do it all..." iconProps={{ iconName: 'Search' }} />
                </div>

                <div className="bar" style={UtilitiesBarStyles}>
                    <ActionButton
                        onClick={() => { this.props.onTool1Click() }}
                        iconProps={{ iconName: 'Ringer' }} >
                    </ActionButton>
                    <ActionButton
                        onClick={() => { this.props.onTool2Click() }}
                        iconProps={{ iconName: 'EmojiNeutral' }}>
                    </ActionButton>
                    <ActionButton
                        onClick={() => { this.props.onTool3Click() }}
                        iconProps={{ iconName: 'Unknown' }} >
                    </ActionButton>
                    <Persona onClick={() => { this.props.onPersonaClick() }}
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
