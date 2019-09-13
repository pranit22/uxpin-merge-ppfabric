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
            selectedIndex: props.selectedIndex || 1,
            disabledIndexes: [],
            width: props.width
        }
    }

    componentDidMount() {
        this.setDisabledIndexes(this.setItems)
    }

    getStyles() {
        return {
            root: {
                width: this.props.width,
            }
        }
    }

    setItems(callback) {
        parse(this.props.items, {
            skip_empty_lines: true
        },
            (err, data) => {
                this.setState({
                    links: data
                        .flat()
                        .map((val, i) => ({
                            name: val,
                            key: name2key(val),
                            disabled: this.state.disabledIndexes.includes(i + 1)
                        }))
                }, callback)
            })
    }

    setDisabledIndexes(callback) {
        parse(this.props.disabled, {
            skip_empty_lines: true
        },
            (err, data) => {
                let disabledIndexes = data.flat().map(i => parseInt(i.trim()))
                this.setState({ disabledIndexes }, callback)
            })
    }


    onMenuClick(event, element) {
        event.preventDefault();
        this.setState({
            selectedIndex: this.state.links.findIndex(link => link.key === element.key) + 1
        }, () => {
            console.log(element);
            // this.props.onLinkClick(element.name)
            Nav.defaultProps.clicked = element.name
            // return element.name
            // this.props.onClick(element.name)
            // this.defaultProps.clicked = element.name

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
                        width={this.state.width}
                        onLinkClick={this.onMenuClick.bind(this)} />

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
      * CSV of items, could be coma separated, or new line
      *  @uxpincontroltype textfield(10)
      * */
    items: PropTypes.string,

    /**
     * CSV list of disabled items Indexes
     * @uxpincontroltype textfield(3)
     * */
    disabled: PropTypes.string,

    /** clicked element */
    onLinkClick: PropTypes.func,

    clicked: PropTypes.string
};

Nav.defaultProps = {
    width: 270,
    selectedIndex: 1,
    items: `Aa
"B, b"
Cc,
Dd,
Ee`,
    disabled: "2, 4"
};


export { Nav as default };
