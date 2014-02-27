Ext.define('DVSI.view.DrawChart', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.drawchart',
    
    
    layout: 'fit',

    initComponent: function() {
        console.log("view.DrawChart initComponent");

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

        Ext.applyIf(this,  {             

            items: [drawComponent]

        });


        this.callParent();
    },


    clear: function() {
        var chartid = this.down('#chartarea').id;
        //var chartspace = $('#'+chartid);
        //chartspace.empty();

        var svg = $("svg");
        svg.empty();
    }


});
