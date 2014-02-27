Ext.define('DVSI.view.DatabaseList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.databaselist',
    
    store: 'Database',
    title: 'Database List',
    hideHeaders: true,
    
    initComponent: function() {
        this.columns = [{
            dataIndex: 'name',
            flex: 1
        }];
        
        this.dockedItems = [{
            dock: 'bottom',
            xtype: 'toolbar',
            items: [{
                xtype: 'label',
                text: 'Sort:'
            }, {
                xtype: 'buttongroup',
                items: [{
                    text: 'By Date',
                    action: 'filter-date'
                }, {
                    text: 'By Name',
                    action: 'filter-name'
                }]
            }]
        }];
        
        this.callParent();
    }
});
