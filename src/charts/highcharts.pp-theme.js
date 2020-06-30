import Highcharts from 'highcharts';

Highcharts.theme = {
    colors: ['#009CDE',
        '#003087',
        '#640487',
        '#DE0063',
        '#FF9600',
        '#018065',
        '#687173',
        '#D64003',
        '#BFDBEE'],
    chart: {
        backgroundColor: 'transparent',
    },
    title: {
        style: {
            color: '#2C2E2F',
            font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
        }
    },
    subtitle: {
        style: {
            color: '#B7BCBF',
            font: 'bold 12px PayPalSansSmall, "Trebuchet MS", Verdana, sans-serif'
        }
    },
    legend: {
        itemStyle: {
            font: '9pt PayPalSansSmall, "Trebuchet MS", Verdana, sans-serif',
            color: '#687173'
        },
        itemHoverStyle: {
            color: '#000000'
        }
    }
};
Highcharts.setOptions(Highcharts.theme);