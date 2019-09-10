import * as React from 'react';
import { Nav as FNav } from 'office-ui-fabric-react';


class Nav extends React.Component {
    constructor(props) {
        super(props);
    }

    getStyles() {
        return {
            root: {
                width: this.props.width,
            },
            navItem: {
                backgroundColor: '#fff'
            }
        }
    }

    getGroups() {
        return [{
            name: 'Extension Overview',
            url: 'dashboard',
            icon: 'Home',
            key: 'overview',
            // onClick: this.onMenuClick.bind(this)
        },
        {
            name: 'Extension Nav 1',
            url: 'nav1',
            icon: 'OpenFolderHorizontal',
            key: 'nav1',
            // onClick: this.onMenuClick.bind(this)
        },]
    }

    render() {
        return (
            <FNav
                uxpId="Nav1"
                onLinkClick={_onLinkClick}
                selectedKey={this.props.selectedIndex}
                expandButtonAriaLabel="Expand or collapse"
                selectedAriaLabel="Selected"
                styles={styles}
                groups={this.getGroups()} />
        )
    }
}

Nav.propTypes = {
    /** Max width for menu */
    width: PropTypes.number,

    /** Which element number should be selected from 1 to n */
    selectedIndex: PropTypes.number,
};

Nav.defaultProps = {
    width: 300,
    selectedIndex: 1
};


export { Nav as default };
