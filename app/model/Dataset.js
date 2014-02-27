Ext.define('DVSI.model.Dataset', {
    extend: 'Ext.data.Model',
    fields: ['name', 'author', 'last_opened', 'database', 'description', 'file', 'metadata', 'vizmethod'],
    
    proxy: {
        type: 'ajax',
        url: 'data/alldata.json',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});
