import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ReactResizeDetector from 'react-resize-detector';
import { csv2arr } from '../../_helpers/parser';

import '../highcharts.pp-theme';

class PPSeriesChart extends React.Component {
    constructor(props) {
        super(props);

        this.chartComponent = React.createRef();
    }

    set() {
        const categories = csv2arr(this.props.categories).flat();
        let series = [];
        for (let i = 1; i <= 5; i++) {
            const name = this.props[`series${i}Name`];
            const data = this.props[`series${i}Data`];
            if (name && data) {
                let parsedData = csv2arr(data)
                    .flat()
                    .filter(num => !isNaN(num))
                    .map(num => +num);

                series.push({
                    name,
                    data: parsedData
                })
            }
        }
        this.setState(
            {
                config: {
                    chart: {
                        type: this.props.type,
                        width: this.props.width || null,
                        height: this.props.height || 200
                    },
                    title: {
                        text: this.props.title || ''
                    },
                    subtitle: {
                        text: this.props.subtitle || ''
                    },
                    xAxis: {
                        title: {
                            text: this.props.xAxisTitle || ''
                        },
                        categories
                    },
                    yAxis: {
                        title: {
                            text: this.props.yAxisTitle || ''
                        }
                    },
                    series,
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
            prevProps.xAxisTitle !== this.props.xAxisTitle ||
            prevProps.yAxisTitle !== this.props.yAxisTitle ||
            prevProps.categories !== this.props.categories ||
            prevProps.series1Name !== this.props.series1Name ||
            prevProps.series1Data !== this.props.series1Data ||
            prevProps.series2Name !== this.props.series2Name ||
            prevProps.series2Data !== this.props.series2Data ||
            prevProps.series3Name !== this.props.series3Name ||
            prevProps.series3Data !== this.props.series3Data ||
            prevProps.series4Name !== this.props.series4Name ||
            prevProps.series4Data !== this.props.series4Data ||
            prevProps.series5Name !== this.props.series5Name ||
            prevProps.series5Data !== this.props.series5Data ||
            prevProps.type !== this.props.type ||
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
            <>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={this.state.config}
                    constructorType={"chart"}
                    ref={this.chartComponent}
                />
                <ReactResizeDetector handleWidth handleHeight refreshMode="debounce" refreshRate={100} onResize={() => this.onResize()} />
            </>
        )
    }
}


PPSeriesChart.propTypes = {
    /**
     * @uxpindescription The chart type. If a chart type to be used is not in this list, please set it in the JSON config.
     * @uxpinpropname Type
     * @uxpincontroltype select
     * */
    type: PropTypes.oneOf(['line', 'spline', 'area', 'areaspline', 'column', 'bar', 'scatter']),
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
     * @uxpindescription The title for X-axis
     * @uxpinpropname X-Axis Title
     * */
    xAxisTitle: PropTypes.string,
    /**
     * @uxpindescription The title for Y-axis
     * @uxpinpropname Y-Axis Title
     * */
    yAxisTitle: PropTypes.string,
    /**
     * @uxpindescription The x-axis categories (timestamps, in case of a timeseries).
     * @uxpinpropname Categories
     * @uxpincontroltype codeeditor
     * */
    categories: PropTypes.string,
    /**
     * @uxpindescription The series 1 name
     * @uxpinpropname Series 1 Name
     * @uxpincontroltype codeeditor
     * */
    series1Name: PropTypes.string,
    /**
     * @uxpindescription The series 1 data
     * @uxpinpropname Series 1 Data
     * @uxpincontroltype codeeditor
     * */
    series1Data: PropTypes.string,

    /**
     * @uxpindescription The series 2 name
     * @uxpinpropname Series 2 Name
     * @uxpincontroltype codeeditor
     * */
    series2Name: PropTypes.string,
    /**
     * @uxpindescription The series 2 data
     * @uxpinpropname Series 2 Data
     * @uxpincontroltype codeeditor
     * */
    series2Data: PropTypes.string,

    /**
     * @uxpindescription The series 3 name
     * @uxpinpropname Series 3 Name
     * @uxpincontroltype codeeditor
     * */
    series3Name: PropTypes.string,
    /**
     * @uxpindescription The series 3 data
     * @uxpinpropname Series 3 Data
     * @uxpincontroltype codeeditor
     * */
    series3Data: PropTypes.string,

    /**
     * @uxpindescription The series 4 name
     * @uxpinpropname Series 4 Name
     * @uxpincontroltype codeeditor
     * */
    series4Name: PropTypes.string,
    /**
     * @uxpindescription The series 4 data
     * @uxpinpropname Series 4 Data
     * @uxpincontroltype codeeditor
     * */
    series4Data: PropTypes.string,

    /**
     * @uxpindescription The series 5 name
     * @uxpinpropname Series 5 Name
     * @uxpincontroltype codeeditor
     * */
    series5Name: PropTypes.string,
    /**
     * @uxpindescription The series 5 data
     * @uxpinpropname Series 5 Data
     * @uxpincontroltype codeeditor
     * */
    series5Data: PropTypes.string,

    /**
     * @uxpindescription Enter a value 1 or higher to set the width. Enter 0 to enable auto sizing.
     * */
    width: PropTypes.number,

    /**
     * @uxpindescription Enter a value 1 or higher to set the height. Enter 0 to enable auto sizing.
     * */
    height: PropTypes.number
}

PPSeriesChart.defaultProps = {
    type: 'spline',
    title: 'User Logins',
    subtitle: 'Number of user logins by platform',
    xAxisTitle: '',
    yAxisTitle: 'Users',
    categories: '3/12, 3/13, 3/14, 3/15, 3/16, 3/17, 3/18',
    series1Name: 'Mobile',
    series1Data: '34, 52, 44, 65, 33, 41, 38',
    series2Name: 'Web',
    series2Data: '13, 21, 24, 42, 18, 19, 16',
    width: 400,
    height: 300
}

export default PPSeriesChart;