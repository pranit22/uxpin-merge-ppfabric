import React, { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import PPTheme from './highcharts.pp-theme';
import ReactResizeDetector from 'react-resize-detector';

const defaultConfig = `{
    "credits": {
        "enabled": false
    }
  }`

const defaultSeries = `[
        {
            "name": "Series 1",
            "data": [1,2,5,3,7,1]
        },
        {
            "name": "Series 2",
            "data": [12, 7, 18, 14, 11, 12]
        }
    ]`

class PPChart extends React.Component {
    constructor(props) {
        super(props);

        this.chartComponent = React.createRef();
    }

    set() {
        this.setState({
            config: {
                chart: {
                    type: this.props.type
                },
                title: {
                    text: this.props.title || ''
                },
                subtitle: {
                    text: this.props.subtitle || ''
                },
                yAxis: {
                    title: {
                        text: this.props.yAxisTitle || ''
                    }
                },
                series: JSON.parse(this.props.series) || JSON.stringify(defaultSeries),
                ...JSON.parse(this.props.config)
            }
        });
    }

    componentDidMount() {
        this.set()
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.config !== this.props.config ||
            prevProps.title !== this.props.title ||
            prevProps.subtitle !== this.props.subtitle ||
            prevProps.yAxisTitle !== this.props.yAxisTitle ||
            prevProps.series !== this.props.series ||
            prevProps.type !== this.props.type
        ) {
            this.set();
        }
    }

    // resize and reflow the chart when the component container is resized
    onResize() {
        const container = this.chartComponent.current.container.current;
        container.style.height = "100%";
        container.style.width = "100%";
        this.chartComponent.current.chart.reflow();
    }

    render() {
        return (<div style={{ height: '100%', width: '100%' }}>
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


PPChart.propTypes = {
    /**
     * @uxpindescription The chart type. If a chart type to be used is not in this list, please set it in the JSON config.
     * @uxpinpropname Type
     * @uxpincontroltype select
     * */
    type: PropTypes.oneOf(['line', 'spline', 'area', 'areaspline', 'column', 'bar', 'pie', 'scatter']),
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
     * @uxpindescription The title for Y-axis
     * @uxpinpropname Y-Axis Title
     * */
    yAxisTitle: PropTypes.string,
    /**
     * @uxpindescription The series configuration. Follows the Highcharts specification for the series.
     * @uxpinpropname Series
     * @uxpincontroltype codeeditor
     * */
    series: PropTypes.string,
    /**
     * @uxpindescription The JSON configuration for the highcharts. Overwrites above properties if they are present in this JSON.
     * @uxpinpropname JSON Config
     * @uxpincontroltype codeeditor
     * */
    config: PropTypes.string
}

PPChart.defaultProps = {
    type: 'spline',
    title: 'Chart Title',
    subtitle: 'Subtitle for the chart',
    yAxisTitle: 'Values',
    series: defaultSeries,
    config: defaultConfig,
}

export default PPChart;