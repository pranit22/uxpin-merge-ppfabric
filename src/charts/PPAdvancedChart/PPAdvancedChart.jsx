import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ReactResizeDetector from 'react-resize-detector';

import '../highcharts.pp-theme';

const defaultConfig = JSON.stringify({
    chart: {
        type: 'area'
    },
    title: {
        text: 'Historic and Estimated Worldwide Population Distribution by Region'
    },
    subtitle: {
        text: 'Source: Wikipedia.org'
    },
    xAxis: {
        categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
    },
    plotOptions: {
        area: {
            stacking: 'percent',

        }
    },
    series: [{
        name: 'Asia',
        data: [502, 635, 809, 947, 1402, 3634, 5268]
    }, {
        name: 'Africa',
        data: [106, 107, 111, 133, 221, 767, 1766]
    }, {
        name: 'Europe',
        data: [163, 203, 276, 408, 547, 729, 628]
    }, {
        name: 'America',
        data: [18, 31, 54, 156, 339, 818, 1201]
    }, {
        name: 'Oceania',
        data: [2, 2, 2, 6, 13, 30, 46]
    }]
}, null, 2);

const defaultHeight = 300;
const defaultWidth = 400;

class PPAdvancedChart extends React.Component {
    constructor(props) {
        super(props);

        this.chartComponent = React.createRef();
    }

    set() {
        let config = JSON.parse(this.props.config);
        // add width and height to the config
        config.chart = {
            ...config.chart,
            width: this.props.width || null,
            height: this.props.height || defaultHeight
        }
        // remove credits that come by default with highcharts
        config.credits = {
            enabled: false
        }

        this.setState(
            { config },
            newState => this.chartComponent.current.chart.reflow()
        );
    }

    componentDidMount() {
        this.set()
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.config !== this.props.config ||
            prevProps.height !== this.props.height ||
            prevProps.width !== this.props.width
        ) {
            this.set();
        }
    }

    // resize and reflow the chart when the component container is resized
    onResize() {
        this.chartComponent.current.chart.reflow();
    }

    render() {
        return (
            <div style={{
                width: this.props.width || 'auto',
                height: this.props.height || defaultHeight
            }}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={this.state.config}
                    constructorType={"chart"}
                    ref={this.chartComponent}
                />
                <ReactResizeDetector handleWidth handleHeight refreshMode="debounce" refreshRate={100} onResize={() => this.onResize()} />
            </div>
        )
    }
}


PPAdvancedChart.propTypes = {
    /**
     * @uxpindescription The JSON configuration for the highcharts. Please refer to go/highcharts for exampless. 
     * @uxpinpropname JSON Config
     * @uxpincontroltype codeeditor
     * */
    config: PropTypes.string,

    /**
     * @uxpindescription Enter a value 1 or higher to set the width. Enter 0 to enable auto sizing.
     * */
    width: PropTypes.number,

    /**
     * @uxpindescription Enter a value 1 or higher to set the height. Enter 0 to enable auto sizing.
     * */
    height: PropTypes.number
}

PPAdvancedChart.defaultProps = {
    config: defaultConfig,
    width: defaultWidth,
    height: defaultHeight
}

export default PPAdvancedChart;