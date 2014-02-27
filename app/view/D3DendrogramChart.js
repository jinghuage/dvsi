Ext.define('DVSI.view.D3DendrogramChart', {
    extend: 'Ext.form.Panel',
    alias: 'widget.dendrogramchart',
    title: 'd3 dendrogram chart property',
    autoScroll: true,
    //collapsible: true,
    //collapseDirection: 'left',
    bodyStyle: 'padding: 5px 5px 0 5px;',
    
    // Fields will be arranged vertically, stretched to full width
    layout: 'anchor',
    defaults: {
        anchor: '100%',
        xtype: 'textfield'
    },

    initComponent: function() {
        console.log("view.D3DendrogramChart initComponent");


        var me = this;

        Ext.applyIf(me,  { 
            items: [
            {
                //xtype: 'textfield',
                itemId: 'labelfield',
                fieldLabel: 'labelfield',
                labelWidth: 80,
                value: 'name'
            },{
                xtype      : 'fieldcontainer',
                fieldLabel : 'graphStyle',
                defaultType: 'radiofield',
                items: [
                    {
                        boxLabel  : 'Radial',
                        name      : 'graphStyle',
                        inputValue: '1',
                        checked   : true,
                        itemId    : 'radialstyle'
                    }, {
                        boxLabel  : 'Depth',
                        name      : 'graphStyle',
                        inputValue: '2',
                        checked   : false,
                        itemId    : 'depthstyle'
                    }, {
                        boxLabel  : 'Width',
                        name      : 'graphStyle',
                        inputValue: '3',
                        checked   : false,
                        itemId    : 'widthstyle'
                    }
                ]
            },{
                xtype: 'checkboxfield',
                boxLabel: 'Interactive',
                checked: true,
                itemId: 'interactive'
             }]

        });


        this.callParent();
    },



    apply: function(chartid, data, selection) {
        console.log("view.D3SeriesChart draw");

        //showselection = typeof showselection !== 'undefined' ? showselection : false;

        //console.log("showselectoin ? " , showselection);

        //this.clear();

        var labelfield = this.down('#labelfield').getValue();
        var style = 'radial';
        if( this.down('#depthstyle').getValue() ) style = 'depth';
        else if( this.down('#widthstyle').getValue() ) style = 'width';

        var interactive = this.down('#interactive').getValue(); //true or false

        console.log(labelfield, style, interactive);
        
        //var bodyid = this.down('#chartarea').id;
        var width = Ext.get(chartid).getWidth();
        var height = Ext.get(chartid).getHeight();
        console.log("chart: ", chartid, width, height);

        //console.log( $('#' + chart.id).get(0) );

        //$('#'+chart.id+'-innerCt').empty();
        //console.log( $('#'+chart.id + '-innerCt')[0] );
        console.log( $('#' + chartid)[0]);

        //var drawchart = d3.chart.circlePackChart();
        var drawchart = d3.chart.dendrogramChart();

        drawchart.width(width).height(height);

        // option to highlight selected data items
        if(selection.length > 0) {

            //var dataController = this.getController('Data');
            //var selectedItems = dataController.getSelectedItems();
            console.log(" selectedItems for area chart: ", selection);

            drawchart.selectedItems(selection);
        }
        //else drawchart.selectedItems([]);


        drawchart.labelfield(labelfield)
                 .style(style)
                 .collapsible(interactive);

        //var formatDate = d3.time.format("%b %Y");
        // function isObject ( obj ) {
        //     return obj && (typeof obj  === "object");
        // }


        // function isArray ( obj ) { 
        //     return isObject(obj) && (obj instanceof Array);
        // }

        //console.log(this.vizdata);
        // require array data
        // console.log(data.default);
        // if(data.default === 'undefined' || !(data.default instanceof Array))
        // {
        //     console.log("require an Array data");
        //     return;
        // }


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
