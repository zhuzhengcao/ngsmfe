export default {
    plotOptions: {
        series: {
            events: {
                legendItemClick: function() {
                    let $this = this;
                    $this.chart.series.forEach(function(e) {
                        if (e._i != $this._i) {
                            e.hide();
                            e.checkbox.checked = false;
                        } else {
                            e.show();
                            e.checkbox.checked = true;
                        }
                    })
                    return false;
                },
                checkboxClick: function() {
                    let $this = this;
                    $this.chart.series.forEach(function(e) {
                        if (e.checkbox.checked) {
                            e.show();
                        } else {
                            e.hide();
                        }
                    })
                    return false;
                },
                afterAnimate: function() {
                    this.checkbox.checked = true;
                }
            },
            showCheckbox: true,
            showInLegend: true,
            marker: {
                enabled: false
            } 
        }
    },
    tooltip: {
        enabled: true,
        shared: true
    },
    legend: {
        margin: 25,
        enabled: true
    },
    title: {
        text: ''
    },
    yAxis: {
        title: {
            text: ' '
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    subtitle: {},
    credits: {
        enabled: false
    }
}