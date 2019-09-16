import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Nav as FNav } from 'office-ui-fabric-react';
import { name2key, getTokens } from '../_helpers/parser.js'
import parse from 'csv-parse'



class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: [],
            selectedIndex: props.selectedIndex || 1,
            disabledIndexes: [],
            width: props.width,
            clicked: null
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

    getLeftIcon(str) {
        if (!getTokens(str).tokens) return null
        if (!getTokens(str).tokens.find(t => t.type === 'icon')) return null
        if (getTokens(str).tokens.find(t => t.type === 'icon').position.label !== 'start') return null
        return getTokens(str).tokens.find(t => t.type === 'icon').target
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
                            name: getTokens(val).text,
                            key: name2key(val),
                            disabled: this.state.disabledIndexes.includes(i + 1),
                            icon: this.getLeftIcon(val)
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


    onMenuClick(event, element, val) {
        event.preventDefault();
        const index = this.state.links.findIndex(link => link.key === element.key) + 1
        this.setState({
            selectedIndex: index
        }, () => {
            if (eval(`this.props.onLink${index}Click`)) eval(`this.props.onLink${index}Click()`)
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
      *  @uxpincontroltype codeeditor
      * */
    items: PropTypes.string,

    /**
     * CSV list of disabled items Indexes
     * @uxpincontroltype textfield(3)
     * */
    disabled: PropTypes.string,

    /** clicked element */
    onLink1Click: PropTypes.func,
    onLink2Click: PropTypes.func,
    onLink3Click: PropTypes.func,
    onLink4Click: PropTypes.func,
    onLink5Click: PropTypes.func,
    onLink6Click: PropTypes.func,
    onLink7Click: PropTypes.func,
    onLink8Click: PropTypes.func,
    onLink9Click: PropTypes.func,
    onLink10Click: PropTypes.func,
    onLink11Click: PropTypes.func,
    onLink12Click: PropTypes.func,
    onLink13Click: PropTypes.func,
    onLink14Click: PropTypes.func,
    onLink15Click: PropTypes.func,
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
