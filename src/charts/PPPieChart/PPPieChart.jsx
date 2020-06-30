import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ReactResizeDetector from 'react-resize-detector';
import { csv2arr } from '../../_helpers/parser';

import '../highcharts.pp-theme';

const defaultHeight = 300;
const defaultWidth = 400;

class PPPieChart extends React.Component {
    constructor(props) {
        super(props);

        this.chartComponent = React.createRef();
    }

    set() {
        let series = csv2arr(this.props.data)
            .filter(row => row[0] && row[1] && !isNaN(row[1]))
            .map(row => ({
                name: row[0],
                y: parseInt(row[1])
            }));

        this.setState(
            {
                config: {
                    chart: {
                        type: 'pie',
                        width: this.props.width || null,
                        height: this.props.height || defaultHeight
                    },
                    title: {
                        text: this.props.title || ''
                    },
                    subtitle: {
                        text: this.props.subtitle || ''
                    },
                    series: [{
                        name: this.props.name,
                        data: series
                    }],
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            dataLabels: {
                                enabled: this.props.labels
                            },
                            showInLegend: this.props.legend
                        }
                    },
                    credits: {
                        enabled: false
                    }
                }
            },
            newState => this.chartComponent.current.chart.reflow()
        );
    }

    componentDidMount() {
        this.set()
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.title !== this.props.title ||
            prevProps.subtitle !== this.props.subtitle ||
            prevProps.data !== this.props.data ||
            prevProps.name !== this.props.name ||
            prevProps.legend !== this.props.legend ||
            prevProps.labels !== this.props.labels ||
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


PPPieChart.propTypes = {
    /**
     * @uxpindescription The title for the chart
     * @uxpinpropname Title
     * */
    title: PropTypes.string,
    /**
     * @uxpindescription The subtitle for the chart
     * @uxpinpropname Subtitle
     * */
    subtitle: PropTypes.string,
    /**
     * @uxpindescription The data for pie chart
     * @uxpinpropname Data
     * @uxpincontroltype codeeditor
     * */
    data: PropTypes.string,
    /**
     * @uxpindescription The name of the entity
     * @uxpinpropname Name
     * */
    name: PropTypes.string,
    /**
     * @uxpindescription To show legend
     * @uxpinpropname Lagend
     * */
    legend: PropTypes.bool,
    /**
     * @uxpindescription To show labels
     * @uxpinpropname Labels
     * */
    labels: PropTypes.bool,

    /**
     * @uxpindescription Enter a value 1 or higher to set the width. Enter 0 to enable auto sizing.
     * */
    width: PropTypes.number,

    /**
     * @uxpindescription Enter a value 1 or higher to set the height. Enter 0 to enable auto sizing.
     * */
    height: PropTypes.number
}

PPPieChart.defaultProps = {
    title: 'User Logins',
    subtitle: 'Number of user logins by countries',
    data: `USA, 52\nAustralia, 23\nChina, 32\nIndia, 30`,
    name: 'Logins',
    legend: true,
    labels: false,
    width: defaultWidth,
    height: defaultHeight
}

export default PPPieChart;