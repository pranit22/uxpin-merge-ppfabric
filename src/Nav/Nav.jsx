import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Nav as FNav } from 'office-ui-fabric-react';
import { name2key } from '../_helpers/parser.js'
import parse from 'csv-parse'


class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: [],
            selectedIndex: this.props.selectedIndex || 1,
        }
    }

    componentDidMount() {
        this.getItems();
    }

    getStyles() {
        return {
            root: {
                width: this.props.width,
            }
        }
    }

    getItems() {
        parse(this.props.items, {
            skip_empty_lines: true
        },
            (err, data) => {
                this.setState({
                    links: data
                        .flat()
                        .map(val => {
                            return {
                                name: val,
                                key: name2key(val),
                                onClick: this.onMenuClick.bind(this)
                            }
                        })
                })
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
        return (
            <>
                {this.state.links.length > 0 ?
                    <FNav
                        selectedKey={this.state.links[this.state.selectedIndex - 1].key}
                        expandButtonAriaLabel="Expand or collapse"
                        selectedAriaLabel="Selected"
                        styles={this.getStyles()}
                        groups={[{ links: this.state.links }]}
                        width={300} />

                    : <div>Incorrect format: {this.props.items} </div>}
            </>
        )
    }
}

Nav.propTypes = {
    /** Max width for menu */
    width: PropTypes.number,

    /** Which element number should be selected from 1 to n */
    selectedIndex: PropTypes.number,

    /** 
      * 
      * CSV of items, could be coma separated, or new line
      *  @uxpincontroltype textfield(20)
      * */
    items: PropTypes.string,
};

Nav.defaultProps = {
    width: 270,
    selectedIndex: 1,
    items: `Aa
"B, b"
Cc`
};


export { Nav as default };
