Ext.define('DVSI.view.D3FlowChart', {
    extend: 'Ext.form.Panel',
    alias: 'widget.flowchart',
    title: 'd3 sankey flow chart property',
    autoScroll: true,
    //collapsible: true,
    //collapseDirection: 'left',
    bodyStyle: 'padding: 5px 5px 0 5px;',   

    // Fields will be arranged vertically, stretched to full width
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },

    initComponent: function() {
        console.log("view.D3FlowChart initComponent");


        var me = this;

        Ext.applyIf(me,  { 
            items: [{
                xtype: 'textfield',
                itemId: 'arrayfield-nodes',
                fieldLabel: 'nodes arrayfield',
                labelWidth: 80,
                value: 'nodes'
            }, {
                xtype: 'textfield',
                itemId: 'arrayfield-links',
                fieldLabel: 'links arrayfield',
                labelWidth: 80,
                value: 'links'
            },{
                xtype: 'textfield',
                itemId: 'datafield-label',
                fieldLabel: 'datafield(label)',
                labelWidth: 80,
                value: 'name'
            }, {
                xtype: 'textfield',
                itemId: 'datafield-value',
                fieldLabel: 'datafield(value)',
                labelWidth: 80,
                value: 'value'
            }]

        });


        this.callParent();
    },



    apply: function(chartid, data, selection) {
        console.log("view.D3FlowChart draw");

        //showselection = typeof showselection !== 'undefined' ? showselection : false;

        //console.log("showselectoin ? " , showselection);

        //this.clear();

        var labelfield = this.down('#datafield-label').getValue();
        var valuefield = this.down('#datafield-value').getValue();
        console.log(labelfield, valuefield);

        var nodesfield = this.down('#arrayfield-nodes').getValue();
        var linksfield = this.down('#arrayfield-links').getValue();
        console.log(nodesfield, linksfield);
         
        //var bodyid = this.down('#chartarea').id;
        var width = Ext.get(chartid).getWidth();
        var height = Ext.get(chartid).getHeight();
        console.log("chart: ", chartid, width, height);

        //console.log( $('#' + chart.id).get(0) );

        //$('#'+chart.id+'-innerCt').empty();
        //console.log( $('#'+chart.id + '-innerCt')[0] );
        console.log( $('#' + chartid)[0]);

        //var drawchart = d3.chart.circlePackChart();
        var drawchart = d3.chart.sankeyFlowChart();

        drawchart.width(width).height(height);

        // option to highlight selected data items
        if(selection.length > 0) {

            //var dataController = this.getController('Data');
            //var selectedItems = dataController.getSelectedItems();
            console.log(" selectedItems for flow chart: ", selection);

            drawchart.selectedItems(selection);
        }
        //else drawchart.selectedItems([]);

        drawchart.label(labelfield)
                 .value(valuefield)
                 .nodes(nodesfield)
                 .links(linksfield);

        //var formatDate = d3.time.format("%b %Y");


        //console.log(this.vizdata);

        //d3.select("#" + chart.id + "-innerCt")
        d3.select("#" + chartid)
           .datum(data)
           .call(drawchart);


        // // Add a mouseover event
        // d3.selectAll("#" + bodyid + " path").on('mouseover', function() {
        //     var d = d3.select(this).data()[0][0];
        //     console.log(d[timefield] + ' has value ' + d[datafield]);
        // });

    }

});
