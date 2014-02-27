Ext.define('DVSI.view.Dataset', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.datasetlist',
    
    store: 'Dataset',
    title: 'Dataset List',
    hideHeaders: true,
    
    initComponent: function() {
        this.columns = [{
            dataIndex: 'name',
            flex: 1
        }];
        
        this.dockedItems = [{
            dock: 'bottom',
            xtype: 'toolbar',
            //html: "test",
            //style: 'border-top: 1px solid; background-color: #9F9;',
            items: [{
                xtype: 'label',
                text: 'Sort:'
            }, {
                xtype: 'buttongroup',
                items: [{
                    text: 'By Database',
                    action: 'filter-database'
                }, {
                    text: 'By Name',
                    action: 'filter-name'
                }]
            }]
        }];
        
        this.callParent();
    }
});
