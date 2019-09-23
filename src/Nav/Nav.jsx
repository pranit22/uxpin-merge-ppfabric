import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Nav as FNav } from 'office-ui-fabric-react';
import { name2key, getTokens } from '../_helpers/parser.jsx'
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
        let tokens = getTokens(str).tokens
        if (!tokens) return null
        if (!tokens.find(t => t.type === 'icon')) return null
        if (tokens.find(t => t.type === 'icon').position.placement !== 'start') return null
        return tokens.find(t => t.type === 'icon').target
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
            if (this.props[`onLink${index}Click`]) this.props[`onLink${index}Click`]()
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

    /** @uxpinpropname Link 1 click */
    onLink1Click: PropTypes.func,

    /** @uxpinpropname Link 2 click */
    onLink2Click: PropTypes.func,

    /** @uxpinpropname Link 3 click */
    onLink3Click: PropTypes.func,

    /** @uxpinpropname Link 4 click */
    onLink4Click: PropTypes.func,

    /** @uxpinpropname Link 5 click */
    onLink5Click: PropTypes.func,

    /** @uxpinpropname Link 6 click */
    onLink6Click: PropTypes.func,

    /** @uxpinpropname Link 7 click */
    onLink7Click: PropTypes.func,

    /** @uxpinpropname Link 8 click */
    onLink8Click: PropTypes.func,

    /** @uxpinpropname Link 9 click */
    onLink9Click: PropTypes.func,

    /** @uxpinpropname Link 10 click */
    onLink10Click: PropTypes.func,

    /** @uxpinpropname Link 11 click */
    onLink11Click: PropTypes.func,

    /** @uxpinpropname Link 12 click */
    onLink12Click: PropTypes.func,

    /** @uxpinpropname Link 13 click */
    onLink13Click: PropTypes.func,

    /** @uxpinpropname Link 14 click */
    onLink14Click: PropTypes.func,

    /** @uxpinpropname Link 15 click */
    onLink15Click: PropTypes.func,
};

Nav.defaultProps = {
    width: 270,
    selectedIndex: 1,
    items: `icon(ViewAll) Aa 
"icon(Edit) B, b"
icon(Emoji2) Cc
Dd
Ee`,
    disabled: "2, 4"
};


export { Nav as default };
