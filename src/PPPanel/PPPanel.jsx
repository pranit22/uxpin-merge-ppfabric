import * as React from 'react';
import { Stack, Text } from 'office-ui-fabric-react';
import IconButton from '../IconButton/IconButton';
import * as PropTypes from 'prop-types';
import Pivot from '../Pivot/Pivot';
import { TpxUxColors } from '../_helpers/tpxuxcolorutils.jsx';

const defaultHeight = 768;
const defaultWidth = 1440;

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

const sizeToWidthMap = {
    small: 300,
    medium: 600,
    large: 900,
    extraLarge: 1200
}

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

class PPPanel extends React.Component {
    dismissPanel() {
        this.props.onDismiss(false);
    }

    render() {
        return (
            <>
                {this.props.show && <div
                    style={{
                        width: this.props.width,
                        height: this.props.height || defaultHeight,
                        color: TpxUxColors.black,
                        backgroundColor: 'rgba(255, 255, 255, 0.4)'
                    }}
                >
                    <div style={{
                        width: sizeToWidthMap[this.props.size],
                        height: this.props.height || defaultHeight,
                        boxShadow: `rgba(0, 0, 0, 0.22) 0px 25.6px 57.6px 0px, rgba(0, 0, 0, 0.18) 0px 4.8px 14.4px 0px`,
                        float: 'right',
                        backgroundColor: TpxUxColors.white
                    }}>
                        {/* Main vertical stack */}
                        <Stack
                            styles={{
                                root: {
                                    width: '100%'
                                }
                            }}
                        >
                            {/* Header Area */}
                            <Stack
                                styles={{
                                    root: {
                                        backgroundColor: TpxUxColors.blue100,
                                        borderBottom: `1px solid ${TpxUxColors.blue300}`
                                    }
                                }}
                            >
                                {/* Header and Close button */}
                                <Stack horizontal>
                                    <Text
                                        variant='large'
                                        block
                                        styles={headerStyles}>
                                        {this.props.headerText}
                                    </Text>

                                    <Stack.Item styles={{
                                        root: {
                                            padding: 12
                                        }
                                    }}>
                                        <IconButton
                                            iconName="Close"
                                            text="Close"
                                            items=""
                                            onClick={() => this.dismissPanel()}
                                        />
                                    </Stack.Item>
                                </Stack>

                                {this.props.pivot && <Pivot
                                    {...this.props}
                                    styles={pivotStyles}
                                />}
                            </Stack>

                            {/* Children Area */}
                            <Stack
                                tokens={{
                                    padding: 24,
                                    childrenGap: 24
                                }}
                            >
                                {_.isEmpty(this.props.children) && instructions}
                                {this.props.children}
                            </Stack>
                        </Stack>

                    </div>

                </div>}

                {!this.props.show && <div
                    style={{
                        width: 0,
                        height: 0
                    }}
                ></div>}
            </>
        );
    }
}

PPPanel.propTypes = {
    /**
     * @uxpinignoreprop hide this from the user
     */
    children: PropTypes.node,

    /**
     * @uxpindescription To show or hide the panel 
     * @uxpinbind onDismiss
     */
    show: PropTypes.bool,

    /**
     * @uxpindescription Action to take on dismiss
     */
    onDismiss: PropTypes.func,

    /**
     * @uxpindescription The size of the panel, choose from available options 
     */
    size: PropTypes.oneOf(['small', 'medium', 'large', 'extraLarge']),

    /**
     * @uxpindescription The size of the panel,
     */
    height: PropTypes.number,

    /**
     * @uxpindescription The width of the container
     */
    width: PropTypes.number,

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

PPPanel.defaultProps = {
    show: true,
    size: 'large',
    height: defaultHeight,
    width: defaultWidth,
    headerText: 'Panel Header',
    pivot: true,
    tabs: `Tab One
    Tab Two
    Tab Three
    Tab Four`
}

export { PPPanel as default };
