Ext.define('DVSI.view.TimeSeriesChart', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.timeserieschart',
    html: '<p>time series chart</p>',
    
    layout: 'fit',


    initComponent: function() {
        console.log("view.TimeSeriesChart initComponent");

        this.vizdata = null;

        var drawComponent = Ext.create('Ext.draw.Component', {
            itemId: 'chartarea',
            viewBox: false
            // items: [{
            //     type: 'circle',
            //     fill: '#79BB3F',
            //     radius: 100,
            //     x: 100,
            //     y: 100
            // }]
        });

        var me = this;

        Ext.applyIf(me,  { 
        //this.items = {
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                itemId: 'vizproperty',
                items: [{
                    xtype: 'textfield',
                    itemId: 'datafield-time',
                    fieldLabel: 'datafield(time)',
                    labelWidth: 70,
                    value: 'date'
                    }, {
                    xtype: 'textfield',
                    itemId: 'datafield-value',
                    fieldLabel: 'datafield(value)',
                    labelWidth: 70,
                    value: 'price'
                    }, '->', {
                    xtype: 'button',
                    text: 'Apply',
                    action: 'draw-chart',
                    scope: me,
                    handler: function(button){ me.draw();}
                    }, ' ', {
                    xtype: 'button',
                    text: 'Clear',
                    action: 'clear-chart',
                    scope: me,
                    handler: function(button){ me.clear();}
                    },' ']
                }],
            
            // items: [{
            //     xtype: 'panel',
            //     itemId: 'chartarea'
            // }]

            items: [drawComponent]
        });


        this.callParent();
    },

    
    setData: function(data) {
        console.log("view.TimeSeriesChart setData");

        this.vizdata = data;
    },

    clear: function() {
        var chartid = this.down('#chartarea').id;
        var chartspace = $('#'+chartid);
        chartspace.empty();
    },

    draw: function() {
        console.log("view.TimeSeriesChart draw");

        this.clear();

        var timefield = this.down('#datafield-time').getValue();
        var valuefield = this.down('#datafield-value').getValue();
        console.log(timefield, valuefield);
        
        var bodyid = this.down('#chartarea').id;
        var width = Ext.get(bodyid).getWidth();
        var height = Ext.get(bodyid).getHeight();
        console.log("chart: ", bodyid, width, height);

        //console.log( $('#' + chart.id).get(0) );

        //$('#'+chart.id+'-innerCt').empty();
        //console.log( $('#'+chart.id + '-innerCt')[0] );
        console.log( $('#' + bodyid)[0]);

        var drawchart = d3.chart.timeSeriesChart();

        drawchart.width(width).height(height);
        drawchart.x(function(d) { return formatDate.parse(d[timefield]); })
                 .y(function(d) { return +d[valuefield]; });

        var formatDate = d3.time.format("%b %Y");


        //console.log(this.vizdata);

        //d3.select("#" + chart.id + "-innerCt")
        d3.select("#" + bodyid)
           .datum(this.vizdata)
           .call(drawchart);


        // // Add a mouseover event
        // d3.selectAll("#" + bodyid + " path").on('mouseover', function() {
        //     var d = d3.select(this).data()[0][0];
        //     console.log(d[timefield] + ' has value ' + d[datafield]);
        // });

    }

});
