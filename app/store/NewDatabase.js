Ext.define('DVSI.store.NewDatabase', {
    extend: 'Ext.data.Store',
    requires: 'DVSI.model.Database',
    model: 'DVSI.model.Database',

    autoLoad: true,
    
    // Overriding the model's default proxy
    proxy: {
        type: 'ajax',
        url: 'data/alldatabase.json',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});
