Ext.define('DVSI.store.Database', {
    extend: 'Ext.data.Store',
    requires: 'DVSI.model.Database',
    model: 'DVSI.model.Database',

    autoLoad: true,
    
    // Overriding the model's default proxy
    proxy: {
        type: 'ajax',
        url: 'data/database.json',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});
