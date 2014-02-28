Ext.define('DVSI.store.MetaData', {
    extend: 'Ext.data.TreeStore',
    requires: 'DVSI.model.MetaData',
    model:'DVSI.model.MetaData',

    root: {
        name: 'meta',
        id: 'meta',
        expanded: true,
        children: []
    },

    proxy: {
        //data: {},
        type: 'memory'
    },
    folderSort: true,

    listeners: {

        // Each demo.UserModel instance will be automatically 
        // decorated with methods/properties of Ext.data.NodeInterface 
        // (i.e., a "node"). Whenever a UserModel node is appended
        // to the tree, this TreeStore will fire an "append" event.
        append: function( thisNode, newChildNode, index, eOpts ) {

            //console.log("append node: ", thisNode, newChildNode, index);
        
        }
    }

});
