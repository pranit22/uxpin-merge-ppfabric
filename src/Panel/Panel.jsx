import * as React from 'react';
import { Panel as FPanel, PanelType, Text } from 'office-ui-fabric-react';
import * as PropTypes from 'prop-types';
import PPVerticalStack from '../PPVerticalStack/PPVerticalStack';
import Pivot from '../Pivot/Pivot';
import { TpxUxColors } from '../_helpers/tpxuxcolorutils.jsx';
import _ from 'lodash';

const panelStyles = {
    commands: {
        marginTop: 0
    },
    navigation: {
        backgroundColor: TpxUxColors.blue100,
        borderBottom: `1px solid ${TpxUxColors.blue300}`
    },
    scrollableContent: {
        paddingTop: 24
    },
    main: {
        backgroundColor: TpxUxColors.white
    }
};

const pivotStyles = {
    root: {
        marginLeft: 24
    }
};

const headerStyles = {
    root: {
        flexGrow: 1,
        padding: 24
    }
};

// Instructions to be shown when the stack is empty
const instructions = (
    <Text
        styles={{
            root: {
                color: "#000000",
                fontWeight: 'normal',
                fontStyle: 'normal',
                display: 'block',
                lineHeight: 'normal'
            }
        }}
        variant={'medium'}>
        To add content, drag and and drop elements to Panel control.
    </Text>
);

class Panel extends React.Component {
    constructor(props) {
        super(props);
    }

    set() {
        this.setState({
            isOpen: this.props.show
        })
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.show !== this.props.show
        ) {
            this.set();
        }
    }

    dismissPanel() {
        this.setState({
            isOpen: false
        })
    }

    render() {
        return (
            <React.Fragment>
                <div
                    className="trigger"
                    style={{
                        width: 10,
                        height: 10,
                        background: this.props.showMarker ? 'var(--color-blue-100)' : 'transparent',
                        borderRadius: 10
                    }} />
                <FPanel
                    styles={panelStyles}
                    isLightDismiss={true}
                    isOpen={this.state.isOpen}
                    onDismiss={() => this.dismissPanel()}
                    type={PanelType[this.props.size]}
                    hasCloseButton={true}
                    closeButtonAriaLabel="Close"
                    onRenderHeader={() => (
                        <PPVerticalStack
                            showInstructions={false}
                            stackWidth='100%'
                            gutterPadding={0}
                        >
                            <Text
                                variant='large'
                                block
                                styles={headerStyles}>
                                {this.props.headerText}
                            </Text>
                            {this.props.pivot && <Pivot
                                {...this.props}
                                styles={pivotStyles}
                            />}
                        </PPVerticalStack>
                    )}
                >
                    {_.isEmpty(this.props.children) && instructions}
                    {this.props.children}
                </FPanel >
            </React.Fragment>
        );
    }
}

Panel.propTypes = {
    /**
     * @uxpinignoreprop hide this from the user
     */
    children: PropTypes.node,

    /**
     * @uxpindescription To show or hide the panel 
     */
    show: PropTypes.bool,

    /**
     * @uxpindescription The size of the panel, choose from available options 
     */
    size: PropTypes.oneOf(['small', 'medium', 'large', 'extraLarge']),

    /**
     * @uxpindescription Whether to show the light blue target marker on the canvas 
     * @uxpinpropname Show Marker
     */
    showMarker: PropTypes.bool,

    /**
     * @uxpindescription The text to be displayed in the header of the panel 
     * @uxpinpropname Header Text
     */
    headerText: PropTypes.string,

    /**
     * @uxpindescription If the content is multi-page, using pivot, the specific children of the panel can be shown/hidden 
     * @uxpinpropname Show Pivot
     */
    pivot: PropTypes.bool,

    /**
  * @uxpindescription The list of tabs. Put one item on each row. Enclose an item in quotes if including a comma. Supports the icon(IconName) feature.
  * @uxpinpropname Tabs
  * @uxpincontroltype codeeditor
  */
    tabs: PropTypes.string.isRequired,

    /**
    * @uxpindescription The 1-based index value of the tab to be shown as selected by default
    * @uxpinpropname Selected Index
    */
    selectedIndex: PropTypes.number,

    /**
    * @uxpindescription Size option 
    * @uxpinpropname Tab Size
    */
    linkSize: PropTypes.oneOf(['normal', 'large']),

    /**
    * @uxpindescription Fires when Tab 1 is clicked
    * @uxpinpropname Tab 1 Click
    */
    onLink1Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Tab 2 is clicked
    * @uxpinpropname Tab 2 Click
    */
    onLink2Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Tab 3 is clicked
    * @uxpinpropname Tab 3 Click
    */
    onLink3Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Tab 4 is clicked
    * @uxpinpropname Tab 4 Click
    */
    onLink4Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Tab 5 is clicked
    * @uxpinpropname Tab 5 Click
    */
    onLink5Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Tab 6 is clicked
    * @uxpinpropname Tab 6 Click
    */
    onLink6Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Tab 7 is clicked
    * @uxpinpropname Tab 7 Click
    */
    onLink7Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Tab 8 is clicked
    * @uxpinpropname Tab 8 Click
    */
    onLink8Click: PropTypes.func,

    /**
    * @uxpindescription Fires when Tab 9 is clicked
    * @uxpinpropname Tab 9 Click
    */
    onLink9Click: PropTypes.func
};

Panel.defaultProps = {
    show: true,
    size: 'large',
    showMarker: true,
    headerText: 'Panel Header',
    pivot: true,
    tabs: `Tab One
    Tab Two
    Tab Three
    Tab Four`
}

export { Panel as default };
