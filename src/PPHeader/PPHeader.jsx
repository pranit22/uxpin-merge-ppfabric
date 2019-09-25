import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Pivot, PivotItem, TextField, Text, TooltipHost, ActionButton } from 'office-ui-fabric-react';
import parse from 'csv-parse'

import './index.scss';
import Persona from '../Persona/Persona'
import Drawer from './Drawer/index.jsx'

class PPHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: null,
            breadcrumbs: []
        }
    }

    componentDidMount() {
        parse(this.props.breadcrumbs, { skip_empty_lines: true },
            (err, data) => {
                this.setState({ breadcrumbs: data.flat().map(v => v.trim()) })
            })
    }

    onMenuClick(elm) {
        let index = parseInt(elm.key.replace('.', '')) + 1;
        let text = elm.props.headerText
        this.setState({ open: text === 'Dashboard' ? null : text }, () => {
            if (this.props[`onMenu${index}Click`]) this.props[`onMenu${index}Click`]()
        })
    }

    onCloseClick() {
        this.setState({ open: null })
    }
    render() {
        let menuItems = ['Code Projects', 'Products', 'Favorites']
        let selectedKey = null
        if (menuItems[this.props.selectedIndex - 1] && this.props.selectedIndex !== '') selectedKey = menuItems[this.props.selectedIndex - 1]
        if (this.state.open) selectedKey = this.state.open
        return (
            <div className="PPHeaderComponent">
                <Drawer
                    open={this.state.open}
                    onCloseClick={this.onCloseClick.bind(this)}
                    productName={this.props.productName}
                    breadcrumbs={this.state.breadcrumbs}
                />

                <div className="logo">
                    <div className="logoImg"></div>
                    <Text key="logo" className="logoTitle" variant='large'>Console</Text>
                </div>

                <div className="menu ">
                    <Pivot onLinkClick={this.onMenuClick.bind(this)} selectedKey={selectedKey}>
                        {menuItems.map(item => <PivotItem headerText={item} itemKey={item}></PivotItem>)}
                    </Pivot>
                </div>

                <div className="search">
                    <TooltipHost content="This is coming in the future">
                        <TextField placeholder="Do it all..." disabled />
                    </TooltipHost>
                </div>

                <div className="bar disabled">
                    <TooltipHost content="This is coming in the future">
                        <ActionButton
                            iconProps={{ iconName: 'Ringer' }}
                            disabled={true} >
                        </ActionButton>
                    </TooltipHost>
                    <TooltipHost content="This is coming in the future">
                        <ActionButton
                            iconProps={{ iconName: 'EmojiNeutral' }}
                            disabled={true} >
                        </ActionButton>
                    </TooltipHost>
                    <TooltipHost content="This is coming in the future">
                        <ActionButton
                            iconProps={{ iconName: 'Help' }}
                            disabled={true} >
                        </ActionButton>
                    </TooltipHost>
                    <TooltipHost content="This is coming in the future">
                        <Persona size="size24" presence="none" hidePersonaDetails />
                    </TooltipHost>
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
};

PPHeader.defaultProps = {
    productName: 'Kafka',
    breadcrumbs: 'Topics, Create Topic',
    selectedIndex: 1
}

export { PPHeader as default };
