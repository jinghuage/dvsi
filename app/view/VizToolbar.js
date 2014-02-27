Ext.define('DVSI.view.VizToolbar', {
    extend: 'Ext.view.View',
    alias: 'widget.viztoolbar',
    //id: 'images-view',
    height: 70,

    store: 'Viz',
    //title: 'Viz Toolbar',
    //hideHeaders: true,
    
    // layout: {
    //     type: 'hbox',
    //     align: 'middle',
    //     pack: 'end'
    // },

    tpl: [
        '<tpl for=".">',        
        '<div class="x-item thumb-wrap">',
          '<div class="thumb"><img src="{icon}"></div>',
          '<span>{name}</span>',
        '</div>',
        '</tpl>'

    ],
    itemSelector: 'div.thumb-wrap',

    initComponent: function() {
        console.log("viztoolbar: initComponent");
        this.callParent();
    }

});
