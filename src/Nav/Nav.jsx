import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Nav as FNav } from 'office-ui-fabric-react';


class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: this.props.selectedIndex | 1
        }
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
            icon: 'Home',
            key: 'overview',
            onClick: this.onMenuClick.bind(this)
        },
        {
            name: 'Extension Nav 1',
            icon: 'OpenFolderHorizontal',
            key: 'nav1',
            onClick: this.onMenuClick.bind(this)
        },]
    }


    onMenuClick(event, element) {
        event.preventDefault();
        this.setState({
            selectedIndex: this.getGroups().findIndex(link => link.key === element.key) + 1
        }, () => {
            return element.name
        })
    }

    render() {
        const links = this.getGroups()
        return (
            <FNav
                selectedKey={links[this.state.selectedIndex - 1].key}
                expandButtonAriaLabel="Expand or collapse"
                selectedAriaLabel="Selected"
                styles={this.getStyles()}
                groups={[{ links }]}
                width={300} />
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
