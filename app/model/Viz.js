Ext.define('DVSI.model.Viz', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name', 'icon'],
    
    proxy: {
        type: 'ajax',
        url: 'data/vizmethods.json',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});
