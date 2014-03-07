Ext.define('DVSI.controller.Viz', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'vizToolbar',
            selector: 'viztoolbar'
        },
        {
            ref: 'vizProperty',       //getter -- get Ext app view class 
            selector: 'vizproperty'   //xtype -- select dom object
        },
        {
            ref: 'drawChart',
            selector: 'drawchart'
        }
    ],

    stores: ['Data', 'TreeData'],


    config: {
        vizTool: null,
        vizData: null,
        vizSelection: ['none'],
        vizConfigWin: null
    },
    
    init: function() {

        // Start listening for events on views
        this.control({
            'viztoolbar': {
                select: this.onVizMethodSelect,
                scope: this
            },
            'datasetlist': {
                selectionchange: this.onNewDataSelect,
                scope: this
            },
            'drawchart #chartarea': {
                click: this.onVizSelectionChange,
                scope: this
            },
            'vizproperty button[action=draw-chart]': {
                click: this.onApplyViz,
                scope: this
            },
            'vizconfig': {
                close: this.clearVizMethod,
                scope: this
            }

        });

        this.application.on({
            'treedataselect': this.onDataItemSelect,
            scope: this
        });


        Ext.define('DVSI.view.VizConfigWindow', {
            extend: 'Ext.window.Window',
            alias: 'widget.vizconfig',
            title: 'Viz Tool Configuration',
            height: 300,
            width: 400, 
            closeAction: 'hide',
            layout: 'anchor',
            anchor: '100%',
            items: [{
                xtype : 'vizproperty',
            }]
        });
    },
    
    // onClick: function() {
    //     console.log("test onClick");
    // },

    onVizMethodSelect: function(selModel, record) {

        var vizmethod = record.data.name;
        console.log("onVizMethodSelect(): selected visualizaton style: ", vizmethod);

        this.setVizTool(record);


        // var property = Ext.create('DVSI.view.VizProperty', 
        //                           { width: 500,
        //                             height: 400, 
        //                             floating: true, 
        //                             closable: true});
        // property.show();

        // a window is movable, which is better than a fixed panel
        // Ext.create('Ext.window.Window', {
        //     title: 'Viz Tool Configuration',
        //     height: 300,
        //     width: 400,    
        //     layout: 'anchor',
        //     anchor: '100%',
        //     items: [{
        //         xtype : 'vizproperty',
        //     }]
        // }).show();

        var vizconfigwin = this.getVizConfigWin();
        if(vizconfigwin === null) {
            vizconfigwin = Ext.create('DVSI.view.VizConfigWindow');
            this.setVizConfigWin(vizconfigwin);
        }
        vizconfigwin.show();




        // if( this.support_vizmethod.indexOf(vizmethod) === -1) {
        //     $('#'+chart.id+'-innerCt').html('<p>visualization style not supported for current dataset</p>');
        //     return;
        // }

        var property = this.getVizProperty();
        property.setChartName(vizmethod);
        
    },


    
    clearVizMethod: function() {

        var viztb = this.getVizToolbar();
        viztb.deselect(this.getVizTool());

        //this.setVizTool(null);

    },

    onNewDataSelect: function(field, selection) {
        //console.log("viz controller: receive event selectionchange from datasetlist: ", selection[0]);
        var selected = selection[0];

        if(selected) {
            //console.log("viz controller: dataset selected: ", selected.data);


            this.clearVizMethod();
            this.setVizTool(null);

            var chart = this.getDrawChart();
            chart.clear();

            //var property = this.getVizProperty();
            //property.setChartName('empty');

        }
    },

    
    // handling viz chart

    onDataItemSelect: function(selection) {

        if(selection[0]) {
            this.setVizSelection(selection);
            this.drawChart();
        }

    },

    onApplyViz: function() {
        
        console.log("viz controller: VizProperty Apply button click");

        var dataController = this.getController('Data');
        var data = dataController.getJsonData();
        this.setVizData(data);

        //console.log("set vizData: ", this.getVizData());

        this.onVizSelectionChange();

        this.setVizSelection(["none"]);

        this.drawChart();

    },

    drawChart: function() {


        
        var chart = this.getDrawChart();
        var chartid = chart.down('#chartarea').id;
        var vizmodule = this.getVizProperty().getLayout().getActiveItem();

        chart.clear();

        if(this.getVizTool() != null){
            vizmodule.apply(chartid, this.getVizData(), this.getVizSelection());
        }
    },


    onVizSelectionChange: function() {    

        console.log("viz controller: chartarea click");


        var selection = this.getVizSelection();
        console.log("vizchart selectedItems: ", selection);

        if(selection[0] != 'none'){
            console.log("fire application level event: vizselectionchange");
            this.application.fireEvent('vizselectionchange', selection);
        }
    }

    
});
