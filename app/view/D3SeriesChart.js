Ext.define('DVSI.view.D3SeriesChart', {
    extend: 'Ext.form.Panel',
    alias: 'widget.serieschart',
    title: 'd3 series chart property',
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
        console.log("view.D3SeriesChart initComponent");


        var me = this;

        Ext.applyIf(me,  { 
            items: [{
                //xtype: 'textfield',
                itemId: 'slider',
                fieldLabel: 'slider',
                labelWidth: 80,
                value: 'Default'
            }, {
                xtype: 'checkboxfield',
                boxLabel: 'Format as Time',
                checked: false,
                itemId: 'istime'
            },
            {
                //xtype: 'textfield',
                itemId: 'datafields',
                fieldLabel: 'datafields',
                labelWidth: 80,
                value: 'economy, cylinders, displacement'
            }, {
                xtype: 'checkboxfield',
                boxLabel: 'All Fields',
                checked: false,
                itemId: 'selectallfields'
            },{
                xtype      : 'fieldcontainer',
                fieldLabel : 'graphStyle',
                defaultType: 'radiofield',
                items: [
                    {
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
                    }
                ]
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

        var slider = this.down('#slider').getValue();
        var time = this.down('#istime').getValue();
        var datafields = this.down('#datafields').getValue();
        var selectall = this.down('#selectallfields').getValue(); //true or false
        var style = 'bar';
        if( this.down('#areastyle').getValue() ) style = 'area';

        var stack = this.down('#stack').getValue(); //true or false

        console.log(slider, datafields, selectall, style, stack);
        
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
        else df = datafields.split(', ');
        drawchart.seriesfield({'name': slider, 'time': time})
                 .datafields(df)
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
