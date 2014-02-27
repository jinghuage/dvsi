Ext.define('DVSI.model.Database', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name'],
    
    proxy: {
        type: 'ajax',
        url: 'data/database.json',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});
