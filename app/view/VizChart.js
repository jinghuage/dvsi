Ext.define('DVSI.view.VizChart', {
    extend: 'Ext.panel.Panel',
    requires: ['DVSI.view.TimeSeriesChart',
               'DVSI.view.CirclePackChart',
               'DVSI.view.ForceChart'],
    alias: 'widget.vizchart',
    
    
    config: {
        chartName: 'Default',
        autoDraw: false,
        vizData: null,
        selectedItems: null
    },


    layout: 'card',

    initComponent: function() {
        console.log("view.VizChart initComponent");

        Ext.applyIf(this,  {             
            items: [{
                xtype: 'panel',
                html: '<p>visualization chart</p>',
                itemId: 'chart-empty'
                },{
                xtype: 'timeserieschart',
                itemId: 'chart-TimeSeries'
                },{
                xtype: 'circlepackchart',
                itemId: 'chart-CirclePack'
                },{
                xtype: 'forcechart',
                itemId: 'chart-Force'
            }],
            
            bbar: ['->', 
                   {
                       xtype: 'button',
                       text: 'Apply',
                       action: 'draw-chart'
                   }, 
                   // ' ', {
                   //     xtype: 'button',
                   //     text: 'Show-selection',
                   //     action: 'draw-chart-selection'
                   // }, 
                   ' ', {
                       xtype: 'button',
                       text: 'Set-selection',
                       action: 'set-chart-selection'
                   }, 
                   ' ', {
                       xtype: 'button',
                       text: 'Clear',
                       action: 'clear-chart'
                   },
                   ' ']

        });


        this.callParent();
    },

    applyChartName: function(chartname) {
        console.log("view.VizChart: applyChartName: ", chartname);

        this.getLayout().setActiveItem('chart-' + chartname);

        //var mychart = this.getLayout().getActiveItem();
        //var me = this;

    },


    clear: function() {
        var chartid = this.getLayout().getActiveItem().down('#chartarea').id;
        var chartspace = $('#'+chartid);
        chartspace.empty();
    },

    draw: function(showselection) {
        var data = this.getVizData();
        var selection = this.getSelectedItems();

        this.getLayout().getActiveItem().draw(data, selection);
    }

});
