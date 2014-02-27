Ext.define('DVSI.store.General', {
    extend: 'Ext.data.Store',
    requires: 'DVSI.model.General',
    model: 'DVSI.model.General',

    data: [
        {id: 1, name: 'save', icon: 'images/config-icon.png'},
        {id: 2, name: 'info', icon: 'images/config-icon.png'},
        {id: 3, name: 'config', icon: 'images/config-icon.png'},
        {id: 4, name: 'about', icon: 'images/config-icon.png'}
    ]
});
