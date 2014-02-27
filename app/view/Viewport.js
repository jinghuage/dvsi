Ext.define('DVSI.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',
    
    requires: [
        'DVSI.view.RawTree',
        'DVSI.view.RawGrid',
        'DVSI.view.NewDatabase',  //view/NewDatabase.js
        'DVSI.view.VizToolbar',   //view/VizToolbar.js
        'DVSI.view.GeneralToolbar', //view/GeneralToolbar.js
        'DVSI.view.DatabaseList', //view/DatabaseList.js
        'DVSI.view.Dataset',      //view/Dataset.js
        'DVSI.view.DataInfo',     //view/DataInfo.js
        'DVSI.view.VizProperty',  //view/VizProperty.js
        'DVSI.view.DrawChart'     //view/DrawChart.js
    ],
    
    initComponent: function() {

        console.log("viewport: initComponent");

        this.items = {
            dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                height: 80,
                //align: 'stretch',
                //enableOverflow: true,
                items: [{
                    xtype: 'newdatabase',
                    width: 200
                },
                ' ', //tbspacer
                {
                    xtype: 'button',
                    text: 'tool sets',
                    width: 100,
                    menu: {
                        showSeparator: false,
                        items: [{
                            text: 'viz toolset one' 
                        },
                        {
                            text: 'viz toolset two'
                        }]
                    }
                },
                //'->', //tbfill
                '-',  //tbseparator
                {
                    xtype: 'viztoolbar',
                    width: 800
                    //flex: 1
                },
                '-',' ',
                {
                    //xtype: 'component',
                    //html: '<h1>数据视觉</h1>',
                    //style: {
                    //    color: 'steelblue'
                    //},
                    xtype: 'generaltoolbar',
                    flex: 1
                    //width: 100
                }
                ]
            }],
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                width: 250,
                xtype: 'panel',
                id: 'west-region',
                title: 'dataset browser',
                collapsible: true,
                collapseDirection: 'left',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'databaselist',
                    flex: 1
                }, {
                    xtype: 'datasetlist',
                    height: 250
                }]
            },
            {
                xtype: 'container',
                flex: 1,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'datainfo',
                    height: 250
                },                
                {
                    xtype: 'panel',
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'drawchart',
                        width: 920
                    }, {
                        xtype: 'vizproperty',
                        flex: 1
                    }]
                }]
            }]
        };
        
        this.callParent();
    }
});
