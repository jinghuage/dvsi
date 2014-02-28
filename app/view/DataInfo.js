
Ext.define('DVSI.view.DataInfo', {
    //extend: 'Ext.panel.Panel',
    extend: 'Ext.tab.Panel',
    alias: 'widget.datainfo',
    title: 'raw data info',
    collapsible: true,

    // requires: [
    //     'DVSI.view.RawTree',
    //     'DVSI.view.RawGrid'
    // ],

    //tpl: '<h1>About {name}</h1><p>{description}</p>',

    scrollable: 'vertical',

    items: [{
        title: 'About',
        itemId: 'about',
        tpl: '<h1>About {name}</h1><p>{description}</p>'
    }, {
        title: 'Raw Data',
        itemId: 'rawdata',
        tabConfig: {
            title: 'Data Values',
            tooltip: 'Look at this dataset in its raw format'
        },
        layout: {
            type: 'hbox',
            align: 'stretch'
        }
    }]
    
});
