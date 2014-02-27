Ext.define('DVSI.view.VizProperty', {
    extend: 'Ext.panel.Panel',
    requires: [
               'DVSI.view.D3CirclePackChart',
               'DVSI.view.D3ParallelCoordChart',
               'DVSI.view.D3SeriesChart',
               'DVSI.view.D3DendrogramChart',
               'DVSI.view.D3ForceChart',
               'DVSI.view.D3FlowChart',
               'DVSI.view.ICMChart'
               ],
    alias: 'widget.vizproperty',
    title: 'current tool configuration -- ICM',
    collapsible: true,
    collapseDirection: 'right',

    config: {
        chartName: 'Default',
        autoDraw: false
    },


    layout: 'card',

    initComponent: function() {
        console.log("view.VizProperty initComponent");

        Ext.applyIf(this,  {             

            bbar: ['->',
                   {
                       xtype: 'button',
                       text: 'Apply',
                       action: 'draw-chart'
                   },' '
                ],

            items: [{
                xtype: 'panel',
                html: '<p>visualization chart configuration</p>',
                itemId: 'chart-empty'
                },{
                xtype: 'parallelcoordchart',
                itemId: 'chart-ParallelCoord'
                },{
                xtype: 'serieschart',
                itemId: 'chart-Series'
                },{
                xtype: 'circlepackchart',
                itemId: 'chart-CirclePack'
                },{
                xtype: 'dendrogramchart',
                itemId: 'chart-Dendrogram'
                },{
                xtype: 'forcechart',
                itemId: 'chart-Force'
                },{
                xtype: 'flowchart',
                itemId: 'chart-Flow'
                },{
                xtype: 'icmchart',
                itemId: 'chart-ICM'
                }
            ]
        });


        this.callParent();
    },

    applyChartName: function(chartname) {
        console.log("view.VizProperty: applyChartName: ", chartname);

        this.getLayout().setActiveItem('chart-' + chartname);

        //var mychart = this.getLayout().getActiveItem();
        //var me = this;

    }

});
