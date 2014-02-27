Ext.define('DVSI.store.Data', {
    extend: 'Ext.data.Store',
    requires: 'DVSI.model.Data',    
    model: 'DVSI.model.Data',

    autoLoad: true,
    autoSync: true
});
