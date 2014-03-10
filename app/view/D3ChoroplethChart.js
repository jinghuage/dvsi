Ext.define('DVSI.view.D3ChoroplethChart', {
    extend: 'Ext.form.Panel',
    alias: 'widget.choroplethchart',
    title: 'd3 choropleth chart property',
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
        console.log("view.D3ChoroplethChart initComponent");


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
                fieldLabel: 'Choropleth',
                labelStyle: 'font-weight:bold;padding:0;',
                layout: 'hbox',
                defaultType: 'textfield',

                fieldDefaults: {
                    labelAlign: 'top'
                },

                items: [{
                    flex: 1,
                    itemId: 'colorfield',
                    fieldLabel: 'colorfield',
                    labelWidth: 60,
                    margins: '0 0 1 5',
                    value: 'rate',
                    allowBlank: false
                }, {
                    flex: 1,
                    itemId: 'areafield',
                    fieldLabel: 'areafield',
                    labelWidth: 60,
                    value: 'countyId',
                    margins: '0 0 1 5',
                    allowBlank: false
                }, {
                    width: 100,
                    xtype: 'checkboxfield',
                    boxLabel: 'Legend',
                    checked: true,
                    margins: '0 0 1 10',
                    itemId: 'colorblocklegend'
                }]
            },{
                xtype      : 'fieldcontainer',
                fieldLabel : 'graphStyle',
                labelStyle: 'font-weight:bold;padding:0;',
                //layout: 'hbox',
                defaultType: 'radiofield',

                items: [{
                    width: 120,
                    boxLabel  : 'World-country',
                    name      : 'graphStyle',
                    inputValue: '1',
                    checked   : false,
                    itemId    : 'world-country'
                }, {
                    width: 120,
                    boxLabel  : 'US-state',
                    name      : 'graphStyle',
                    inputValue: '2',
                    checked   : false,
                    itemId    : 'us-state'
                }, {
                    boxLabel  : 'US-county',
                    name      : 'graphStyle',
                    inputValue: '3',
                    checked   : true,
                    itemId    : 'us-county'
                }]
                
            }]

        });


        this.callParent();
    },



    apply: function(chartid, data, selection) {
        console.log("view.D3ChoroplethChart draw");

        //showselection = typeof showselection !== 'undefined' ? showselection : false;

        //console.log("showselectoin ? " , showselection);

        //this.clear();

        var colorfield = this.down('#colorfield').getValue();
        var areafield = this.down('#areafield').getValue();
        var legend = this.down('#colorblocklegend').getValue();
        var style = 'us-country';
        if( this.down('#world-country').getValue() ) style = 'world-country';
        if( this.down('#us-state').getValue() ) style = 'us-state';

        
        //var bodyid = this.down('#chartarea').id;
        var width = Ext.get(chartid).getWidth();
        var height = Ext.get(chartid).getHeight();
        console.log("chart: ", chartid, width, height);

        //console.log( $('#' + chart.id).get(0) );

        //$('#'+chart.id+'-innerCt').empty();
        //console.log( $('#'+chart.id + '-innerCt')[0] );
        console.log( $('#' + chartid)[0]);

        //var drawchart = d3.chart.circlePackChart();
        var drawchart = d3.chart.choroplethChart();

        drawchart.width(width).height(height);

        // option to highlight selected data items
        if(selection.length > 0) {

            //var dataController = this.getController('Data');
            //var selectedItems = dataController.getSelectedItems();
            console.log(" selectedItems for choropleth chart: ", selection);

            drawchart.selectedItems(selection);
        }
        //else drawchart.selectedItems([]);

        drawchart.colorfield(colorfield)
                 .areafield(areafield)
                 .legend(legend)
                 .graphstyle(style);

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
