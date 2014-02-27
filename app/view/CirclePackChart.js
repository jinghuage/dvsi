Ext.define('DVSI.view.CirclePackChart', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.circlepackchart',
    html: '<p>circle pack chart</p>',
    
    layout: 'fit',


    initComponent: function() {
        console.log("view.CirclePackChart initComponent");

        //this.vizdata = null;
        //this.selectedItems = null;

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
                    value: 'name'
                }, {
                    xtype: 'textfield',
                    itemId: 'datafield-value',
                    fieldLabel: 'datafield(value)',
                    labelWidth: 70,
                    value: 'size'
                }]
            }],
            
            // items: [{
            //     xtype: 'panel',
            //     itemId: 'chartarea'
            // }]

            items: [drawComponent]
        });


        this.callParent();
    },



    draw: function(data, selection) {
        console.log("view.CirclePackChart draw");

        //showselection = typeof showselection !== 'undefined' ? showselection : false;

        //console.log("showselectoin ? " , showselection);

        //this.clear();

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
        var drawchart = d3.chart.circlePackChart();

        drawchart.width(width).height(height);

        // option to highlight selected data items
        if(selection.length > 0) {

            //var dataController = this.getController('Data');
            //var selectedItems = dataController.getSelectedItems();
            console.log(" selectedItems for cirlepack chart: ", selection);

            drawchart.selectedItems(selection);
        }
        //else drawchart.selectedItems([]);

        drawchart.label(function(d) { return d[labelfield]; })
                 .value(function(d) { return +d[valuefield]; });

        //var formatDate = d3.time.format("%b %Y");


        //console.log(this.vizdata);

        //d3.select("#" + chart.id + "-innerCt")
        d3.select("#" + bodyid)
           .datum(data)
           .call(drawchart);


        // // Add a mouseover event
        // d3.selectAll("#" + bodyid + " path").on('mouseover', function() {
        //     var d = d3.select(this).data()[0][0];
        //     console.log(d[timefield] + ' has value ' + d[datafield]);
        // });

    }

});
