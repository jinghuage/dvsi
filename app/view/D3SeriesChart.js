Ext.define('DVSI.view.D3SeriesChart', {
    extend: 'Ext.form.Panel',
    alias: 'widget.serieschart',
    title: 'd3 series chart property',
    autoScroll: true,
    //collapsible: true,
    //collapseDirection: 'left',
    bodyStyle: 'padding: 5px;',
    
    // Fields will be arranged vertically, stretched to full width
    layout: 'anchor',
    defaults: {
        anchor: '100%',
        xtype: 'textfield'
    },

    initComponent: function() {
        console.log("view.D3SeriesChart initComponent");


        var me = this;

        Ext.applyIf(me,  { 
            // layout: {
            //     type: 'vbox',
            //     align: 'stretch'
            // },
            // //border: false,
            // bodyPadding: 10,

            items: [{
                xtype: 'fieldcontainer',
                fieldLabel: 'X axis',
                labelStyle: 'font-weight:bold;',
                layout: 'hbox',
                defaultType: 'textfield',

                // fieldDefaults: {
                //     labelAlign: 'top'
                // },
                
                items: [{
                    flex: 1,
                    itemId: 'xfield',
                    fieldLabel: 'datafield',
                    labelWidth: 60,
                    value: 'Default',
                    allowBlank: false
                }, {
                    width: 100,
                    xtype: 'checkboxfield',
                    boxLabel: 'Time',
                    checked: false,
                    margins: '0 0 0 10',
                    itemId: 'istime'
                }]
            },{                
                xtype: 'fieldcontainer',
                fieldLabel: 'Plots',
                labelStyle: 'font-weight:bold;padding:0;',
                layout: 'hbox',
                defaultType: 'textfield',

                // fieldDefaults: {
                //     labelAlign: 'top'
                // },

                items: [{
                    flex: 1,
                    itemId: 'plotfields',
                    fieldLabel: 'datafields',
                    labelWidth: 60,
                    value: 'economy, cylinders, displacement',
                    allowBlank: false
                }, {
                    width: 100,
                    xtype: 'checkboxfield',
                    boxLabel: 'All Fields',
                    checked: false,
                    margins: '0 0 0 10',
                    itemId: 'selectallfields'
                }]
            },{                
                xtype: 'fieldcontainer',
                fieldLabel: 'Legend',
                labelStyle: 'font-weight:bold;padding:0;',
                layout: 'hbox',
                defaultType: 'textfield',

                // fieldDefaults: {
                //     labelAlign: 'top'
                // },

                items: [{
                    flex: 1,
                    itemId: 'legendfield',
                    fieldLabel: 'datafield',
                    labelWidth: 60,
                    value: 'name',
                    allowBlank: true
                }, {
                    width: 100,
                    xtype: 'checkboxfield',
                    boxLabel: 'Color Block',
                    checked: true,
                    margins: '0 0 0 10',
                    itemId: 'colorblocklegend'
                }]
            },{
                xtype      : 'fieldcontainer',
                fieldLabel : 'graphStyle',
                labelStyle: 'font-weight:bold;padding:0;',
                layout: 'hbox',
                defaultType: 'radiofield',

                items: [{
                    width: 120,
                    boxLabel  : 'Bar',
                    name      : 'graphStyle',
                    inputValue: '1',
                    itemId    : 'barstyle'
                }, {
                    boxLabel  : 'Area',
                    name      : 'graphStyle',
                    inputValue: '2',
                    checked   : true,
                    itemId    : 'areastyle'
                }]
                
            },{
                xtype: 'checkboxfield',
                boxLabel: 'Stack Graphs',
                checked: false,
                itemId: 'stack'
            }]

        });


        this.callParent();
    },



    apply: function(chartid, data, selection) {
        console.log("view.D3SeriesChart draw");

        //showselection = typeof showselection !== 'undefined' ? showselection : false;

        //console.log("showselectoin ? " , showselection);

        //this.clear();

        var xfield = this.down('#xfield').getValue();
        var time = this.down('#istime').getValue();
        var plotfields = this.down('#plotfields').getValue();
        var selectall = this.down('#selectallfields').getValue(); //true or false
        var legendfield = this.down('#legendfield').getValue();
        var colorblock = this.down('#colorblocklegend').getValue();
        var style = 'bar';
        if( this.down('#areastyle').getValue() ) style = 'area';

        var stack = this.down('#stack').getValue(); //true or false

        console.log(xfield, plotfields, legendfield, selectall, style, stack);
        
        //var bodyid = this.down('#chartarea').id;
        var width = Ext.get(chartid).getWidth();
        var height = Ext.get(chartid).getHeight();
        console.log("chart: ", chartid, width, height);

        //console.log( $('#' + chart.id).get(0) );

        //$('#'+chart.id+'-innerCt').empty();
        //console.log( $('#'+chart.id + '-innerCt')[0] );
        console.log( $('#' + chartid)[0]);

        //var drawchart = d3.chart.circlePackChart();
        var drawchart = d3.chart.seriesChart();

        drawchart.width(width).height(height);

        // option to highlight selected data items
        if(selection.length > 0) {

            //var dataController = this.getController('Data');
            //var selectedItems = dataController.getSelectedItems();
            console.log(" selectedItems for area chart: ", selection);

            drawchart.selectedItems(selection);
        }
        //else drawchart.selectedItems([]);

        var df = [];
        if(selectall) df = ['all'];
        else df = plotfields.split(', ');
        drawchart.xfield({'name': xfield, 'time': time})
                 .plotfields(df)
                 .legendfield(legendfield)
                 .graphstyle(style)
                 .stack(stack);

        //var formatDate = d3.time.format("%b %Y");


        //console.log(this.vizdata);
        // require array data
        // console.log(data.default);
        if(data.default === 'undefined' || !(data.default instanceof Array))
        {
            console.log("require an Array data");
            return;
        }


        //d3.select("#" + chart.id + "-innerCt")
        d3.select("#" + chartid)
           .datum(data.default)
           .call(drawchart);


        // // Add a mouseover event
        // d3.selectAll("#" + bodyid + " path").on('mouseover', function() {
        //     var d = d3.select(this).data()[0][0];
        //     console.log(d[timefield] + ' has value ' + d[datafield]);
        // });

    }

});
