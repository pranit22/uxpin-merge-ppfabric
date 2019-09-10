import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Nav as FNav } from 'office-ui-fabric-react';
import { csv2arr, name2key } from '../_helpers/parser.ts'

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: this.props.selectedIndex || 1
        }
    }

    getStyles() {
        return {
            root: {
                width: this.props.width,
            }
        }
    }

    getItems() {
        return csv2arr(this.props.items)
            .map(val => {
                return {
                    name: val,
                    key: name2key(val),
                    onClick: this.onMenuClick.bind(this)
                }
            })
    }


    onMenuClick(event, element) {
        event.preventDefault();
        this.setState({
            selectedIndex: this.getItems().findIndex(link => link.key === element.key) + 1
        }, () => {
            return element.name
        })
    }

    render() {
        const links = this.getItems()
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

    /** Coma separated items names */
    items: PropTypes.string
};

Nav.defaultProps = {
    width: 270,
    selectedIndex: 1,
    items: `Aa, "B, b", Cc`
};


export { Nav as default };
