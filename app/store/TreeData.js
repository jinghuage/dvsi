Ext.define('DVSI.store.TreeData', {
    extend: 'Ext.data.TreeStore',
    requires: 'DVSI.model.TreeData',
    model:'DVSI.model.TreeData',

    // root: {
    //     name: "rawdata",
    //     expanded: true,
    //     children: [
    //         { name: "detention", leaf: true },
    //         { name: "homework", expanded: true, children: [
    //             { name: "book report", leaf: true },
    //             { name: "algebra", leaf: true}
    //         ] },
    //         { name: "buy lottery tickets", leaf: true }
    //     ]
    // }

    proxy: {
        data: {},
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
