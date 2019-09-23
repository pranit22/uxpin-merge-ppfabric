import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { ActionButton /*, css, classNamesFunction, IButtonProps, IStyle */ } from 'office-ui-fabric-react';
import './index.scss';

import logoSvg from './images/logo.svg';
import Drawer from './Drawer/index'

class PPHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: null,  // null, 'Products', 'Favorites'
        }
    }
    onMenuClick(elm) {
        let text = elm.props.headerText
        this.setState({ open: text === 'Dashboard' ? null : text }, () => {
            if (text === 'Dashboard') this.props.history.push('/')
        })
    }

    onCloseClick() {
        this.setState({ open: null })
    }
    render() {
        return (
            <div className="PPHeaderComponent">
                <Drawer
                    open={this.state.open}
                    onCloseClick={this.onCloseClick.bind(this)} />

                <div className="logo">
                    <img alt="Console logo" src={logoSvg}></img>
                </div>

                <div className="menu ">
                    <Pivot onLinkClick={this.onMenuClick.bind(this)} selectedKey={this.state.open}>
                        <PivotItem headerText="Dashboard" itemKey='Dashboard'></PivotItem>
                        <PivotItem headerText="Products" itemKey='Products'></PivotItem>
                        <PivotItem headerText="Favorites" itemKey='Favorites'></PivotItem>
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
                        <div className="imagePlaceholder" />
                    </TooltipHost>
                </div>

            </div >
        )
    }
}

PPHeader.propTypes = {
    productName: PropTypes.string,
    breadcrumbs: PropTypes.string,
};

PPHeader.defaultProps = {
    productName: 'Kafka',
    breadcrumbs: 'Kafka, Topics, Create Topic',
}

export { PPHeader as default };
