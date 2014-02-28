
//var types = Ext.data.Types; // allow shorthand type access

Ext.define('DVSI.model.MetaData', {
    extend:'Ext.data.Model',
    fields: [{ name: 'id', type: 'string'},
             { name: 'name', type: 'string'}]

    // proxy:{
    //     type:'memory',
    //     reader: 'json'
    // }
});
