Ext.define('DVSI.view.ForceChart', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.forcechart',
    html: '<p>force chart</p>',
    
    layout: 'fit',


    initComponent: function() {
        console.log("view.ForceChart initComponent");

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
                    itemId: 'datafield-label',
                    fieldLabel: 'datafield(label)',
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
        console.log("view.ForceChart setData");

        this.vizdata = data;
    },

    clear: function() {
        var chartid = this.down('#chartarea').id;
        var chartspace = $('#'+chartid);
        chartspace.empty();
    },

    draw: function() {
        console.log("view.ForceChart draw");

        this.clear();

        var labelfield = this.down('#datafield-label').getValue();
        var valuefield = this.down('#datafield-value').getValue();
        console.log(labelfield, valuefield);
        
        var bodyid = this.down('#chartarea').id;
        var width = Ext.get(bodyid).getWidth();
        var height = Ext.get(bodyid).getHeight();
        console.log("chart: ", bodyid, width, height);

        //console.log( $('#' + chart.id).get(0) );

        //$('#'+chart.id+'-innerCt').empty();
        //console.log( $('#'+chart.id + '-innerCt')[0] );
        console.log( $('#' + bodyid)[0]);

        //var drawchart = d3.chart.circlePackChart();
        var drawchart = d3.chart.forceChart();

        drawchart.width(width).height(height);
        drawchart.label(function(d) { return d[labelfield]; })
                 .value(function(d) { return +d[valuefield]; });

        //var formatDate = d3.time.format("%b %Y");


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
