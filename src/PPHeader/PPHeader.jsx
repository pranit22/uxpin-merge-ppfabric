import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Pivot, PivotItem, TextField, Text, TooltipHost, ActionButton } from 'office-ui-fabric-react';
// import { ActionButton /*, css, classNamesFunction, IButtonProps, IStyle */ } from 'office-ui-fabric-react';
import './index.scss';
import Persona from '../Persona/Persona'

// import logoSvg from './images/logo.svg';
import Drawer from './Drawer/index.jsx'

class PPHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: null,  // null, 'Products', 'Favorites'
        }
    }
    onMenuClick(elm) {
        let text = elm.props.headerText
        this.setState({ open: text === 'Dashboard' ? null : text })
    }

    onCloseClick() {
        this.setState({ open: null })
    }
    render() {
        return (
            <div className="PPHeaderComponent">
                <Drawer
                    open={this.state.open}
                    onCloseClick={this.onCloseClick.bind(this)}
                    productName={this.props.productName}
                    breadcrumbs={this.props.breadcrumbs}
                />

                <div className="logo">
                    <div className="logoImg"></div>
                    <Text key="logo" variant='mediumPlus'>Console</Text>
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
};

PPHeader.defaultProps = {
    productName: 'Kafka',
    breadcrumbs: 'Kafka, Topics, Create Topic',
}

export { PPHeader as default };
