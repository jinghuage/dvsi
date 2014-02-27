Ext.define('DVSI.view.GeneralToolbar', {
    extend: 'Ext.view.View',
    alias: 'widget.generaltoolbar',
    //id: 'images-view-g',
    height: 70,

    store: 'General',
    //title: 'Viz Toolbar',
    //hideHeaders: true,
    
    // layout: {
    //     type: 'hbox',
    //     align: 'middle',
    //     pack: 'end'
    // },

    tpl: [
        '<tpl for=".">',        
        '<div class="x-item thumb-wrap-s">',
          '<div class="thumb-s"><img src="{icon}"></div>',
          '<span>{name}</span>',
        '</div>',
        '</tpl>'

    ],
    itemSelector: 'div.thumb-wrap-s',

    initComponent: function() {
        console.log("generaltoolbar: initComponent");
        this.callParent();
    }

});
