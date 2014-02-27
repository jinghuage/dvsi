
var types = Ext.data.Types; // allow shorthand type access

Ext.define('DVSI.model.TreeData', {
    extend:'Ext.data.Model',
    fields: [{ name: 'id', type: 'string'},
             { name: 'name', type: 'string'},
             { name: 'size', type: types.INT}]

    // proxy:{
    //     type:'memory',
    //     reader: 'json'
    // }
});
