Ext.define('DVSI.view.MetaData', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.metadata',

    store: 'MetaData',
    title: 'MetaData',
    hideHeaders: true,

    rootVisible: false,
    collapsible: true,
    useArrows: true,
    singleExpand: true,
    displayField: 'name'
    // columns: [{
    //     xtype: 'treecolumn', //this is so we know which column will show the tree
    //     text: 'Name',
    //     flex: 2,
    //     sortable: true,
    //     dataIndex: 'name'
    // }]

});
