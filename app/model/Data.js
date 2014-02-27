Ext.define('DVSI.model.Data', {
    extend: 'Ext.data.Model',
    fields: [],
    
    proxy: {
        type: 'memory',
        reader: 'json'
    }
});
