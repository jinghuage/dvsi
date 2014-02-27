Ext.define('DVSI.controller.Database', {
    extend: 'Ext.app.Controller',

    refs: [{
        ref: 'databaseList',
        selector: 'databaselist'
    }],

    stores: ['Database', 'NewDatabase'],
    
    init: function() {
        // Start listening for events on views
        this.control({
            'databaselist': {
                selectionchange: this.onDatabaseSelect
            },
            'databaselist button[filter-date]': {
                click: this.filterByDate
            },
            'databaselist button[filter-name]': {
                click: this.filterByName
            },
            'newdatabase': {
                select: this.onNewDatabaseSelect
            }
        });
    },
    
    onLaunch: function() {
        var databaseStore = this.getDatabaseStore();        
        databaseStore.load({
            callback: this.onDatabaseLoad,
            scope: this
        });
    },

    onDatabaseLoad: function() {
        var databaseList = this.getDatabaseList();
        //console.log("xtype databaseList: ", databaseList);

        databaseList.getSelectionModel().select(0);
    },
    
    onDatabaseSelect: function(selModel, selection) {
        //console.log("database controller receive event selectionchange from databaselist: name:", selection[0].get('name'));

        // Fire an application wide event
        this.application.fireEvent('databasestart', selection[0]);
        //console.log("database controller fire application level event: databasestart");
    },
    
    onNewDatabaseSelect: function(field, selection) {
        //console.log("database controller receive event select from newdatabase");
        
        //console.log("newdatabase selection: ", selection[0].get('id'));

        var selected = selection[0],
            store = this.getDatabaseStore(),
            list = this.getDatabaseList();
            
        if (selected && !store.getById(selected.get('id'))) {
            store.add(selected);
        }
        list.getSelectionModel().select(selected);
    },

    filterByDate: function(button, event, opt) {
        var databasestore = this.getDatabaseStore();
    },
    
    filterByName: function(button, event, opt) {
    }
});
