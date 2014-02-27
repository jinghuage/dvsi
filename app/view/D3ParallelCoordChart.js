Ext.define('DVSI.view.D3ParallelCoordChart', {
    extend: 'Ext.form.Panel',
    alias: 'widget.parallelcoordchart',
    title: 'd3 parallel coordinate chart property',
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
        console.log("view.D3ParallelCoordChart initComponent");


        var me = this;

        Ext.applyIf(me,  { 
            items: [{
                xtype: 'textfield',
                itemId: 'datafields',
                fieldLabel: 'datafields',
                labelWidth: 80,
                value: 'economy, cylinders, displacement'
            }, {
                xtype: 'checkboxfield',
                boxLabel: 'All Fields',
                checked: true,
                itemId: 'selectallfields'
            }]

        });


        this.callParent();
    },



    apply: function(chartid, data, selection) {
        console.log("view.D3SeriesChart draw");

        //showselection = typeof showselection !== 'undefined' ? showselection : false;

        //console.log("showselectoin ? " , showselection);

        //this.clear();


        var datafields = this.down('#datafields').getValue();
        var selectall = this.down('#selectallfields').getValue(); //true or false
        console.log(datafields, selectall);
        
        //var bodyid = this.down('#chartarea').id;
        var width = Ext.get(chartid).getWidth();
        var height = Ext.get(chartid).getHeight();
        console.log("chart: ", chartid, width, height);

        //console.log( $('#' + chart.id).get(0) );

        //$('#'+chart.id+'-innerCt').empty();
        //console.log( $('#'+chart.id + '-innerCt')[0] );
        console.log( $('#' + chartid)[0]);

        //var drawchart = d3.chart.circlePackChart();
        var drawchart = d3.chart.parallelCoordChart();

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
        
        drawchart.datafields(df);

        //var formatDate = d3.time.format("%b %Y");
        if(data.default === 'undefined' || !(data.default instanceof Array))
        {
            console.log("require an Array data");
            return;
        }

        //console.log(this.vizdata);

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
