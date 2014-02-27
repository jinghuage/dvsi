Ext.define('DVSI.controller.Chart', {
    extend: 'Ext.app.Controller',

    refs: [{
        ref: 'vizChart',
        selector: 'vizchart'
    }],

    
    init: function() {
        this.application.on({
            vizstart: this.drawChart,
            scope: this
        });
    },
    
    drawChart: function(vizmethod) {
        console.log("chart controller receive application level event: vizstart: ", vizmethod.data);
        var chart = this.getVizChart();

        
        
    }
});
