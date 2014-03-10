Ext.define('DVSI.controller.Data', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'dataInfo',
            selector: 'datainfo'
        }, 
        {
            ref: 'datasetList',
            selector: 'datasetlist'
        },
        {
            ref: 'metadataPanel',
            selector: 'metadata'
        }
    ],

    models: ['TreeData', 'Data', 'MetaData'],
    stores: ['Dataset', 'Data', 'TreeData', 'MetaData'],

    
    config: {
        hierarchyStatus: false,
        metaTree: {name: "meta", expanded: true, children: []},
        jsonData: {},
        selectedItems: [],
        storeRoot: '',
        columnsArr: {},
        modelFields:{},
        contentChange: false
    },

    init: function() {

        this.control({
            'datasetlist': {
                selectionchange: this.onDataSelect,
                scope: this
            },
            'metadata': { //treepanel : I use the event 'itemclick' instead of 'selectionchange'
                itemclick: this.onMetaDataSelect,
                scope: this
            },
            'datainfo #rawdata': {
                activate: this.onRawDataTab,
                deactivate: this.onOtherTab,
                scope: this
            },
            'datainfo #rawdata #treepanel': { //alert: looks like too much nesting to me
                itemclick: this.onTreeDataSelect,
                scope: this
            }
        });

        // Listen for an application wide event
        this.application.on({
            databasestart: this.onDatabaseStart,
            vizselectionchange: this.onTreeDataSelectionChange,
            scope: this
        });
    },
    
    onDatabaseStart: function(database) {

        //console.log("data controller: receive application level event: databasestart, name:", database.get('name'));

        var datasetList = this.getDatasetList();
        datasetList.getSelectionModel().deselectAll();


        var store = this.getDatasetStore();
        //console.log("data controller: dataset store: ", store);


        store.load({
            callback: this.onDatasetLoad,
            params: {
                database: database.get('name')
            },            
            scope: this
        });
    },
    
    onDatasetLoad: function(data, request) {
        //console.log("data controller: get request for event databasestart ", request.params);
 
        var store = this.getDatasetStore(),
            datasetList = this.getDatasetList();
        
        //datasetList.getSelectionModel();

        // The data should already be filtered on the serverside but since we
        // are loading static data we need to do this after we loaded all the data
        store.clearFilter();
        store.filter('database', request.params.database);
        store.sort('opened_date', 'ASC');        

        datasetList.getSelectionModel().select(store.last());
    },
    

    onDataSelect: function(selModel, selection) {
        //console.log("data controller: receive event selectionchange from datasetlist: ", selection[0]);
        var selected = selection[0];

        // Attention: selectionchange event will be fired if selectoin is lost, e.g. mouse click other grid
        // in this case, selection will be undefined
        // so must check selection before execute late code, otherwise error will occur
        // and later code will not be executed either
        if(selected) {
            //console.log("dataset selected: ", selection[0].data);

            var tree_store = this.getTreeDataStore();
            tree_store.setRootNode(null);
            var data_store = this.getDataStore();
            data_store.removeAll();

            var df = selection[0].data.file;
            var metadata = selection[0].data.metadata;

            if(metadata) this.read_metadata(metadata);
            if(df) this.requestDataset(df);

            this.setContentChange(true);

            // update html template
            //this.getDataInfo().update(selection[0]);
            if(selection[0])
                this.getDataInfo().down('#about').update(selection[0].data);

        }

        this.getDataInfo().setActiveTab(0);
        // var grid_panel = this.getDataInfo().down('#rawdata').down('#gridpanel');
        // var tree_panel = this.getDataInfo().down('#rawdata').down('#treepanel');
        // if(grid_panel) grid_panel.hide();
        // if(tree_panel) tree_panel.hide();

    },


    onOtherTab: function() {
        console.log("deactivate");

    },
    
    onRawDataTab: function() {
        console.log("tab rawdata tap");
 
        var grid_panel = this.getDataInfo().down('#rawdata').down('#gridpanel');
        var tree_panel = this.getDataInfo().down('#rawdata').down('#treepanel');
        var grid_store = this.getDataStore();
        var tree_store = this.getTreeDataStore();
        //var column = this.getColumnsArr()[this.getStoreRoot()];
        var column = [];

        if( grid_panel === null && tree_panel === null) {
            console.log("create a grid panel for tab #rawdata");
  
            grid_panel = Ext.create('Ext.grid.Panel', {
                itemId: 'gridpanel',
                //title: store_root,
                store: grid_store,
                columns: column,
                width: 920,
                height: 220
            });

            //grid_panel.getDockedItems()[1].add(searchTextField);

            this.getDataInfo().down('#rawdata').add(grid_panel);


            console.log("create a tree panel for tab #rawdata");
            tree_panel = Ext.create('Ext.tree.Panel', {
                itemId: 'treepanel',
                //title: 'data hierarchy',
                store: tree_store,
                rootVisible: false,
                collapsible: true,
                useArrows: true,
                singleExpand: true,
                //displayField: 'name',
                columns: [{
                xtype: 'treecolumn', //this is so we know which column will show the tree
                text: 'Name',
                flex: 2,
                sortable: true,
                dataIndex: 'name'
                }],
                flex: 1
            });

            // //example: use columns for treegrid
            // columns: [{
            // xtype: 'treecolumn', //this is so we know which column will show the tree
            // text: 'Name',
            // flex: 2,
            // sortable: true,
            // dataIndex: 'name'
            // },{
            // text: 'Duration',
            // flex: 1,
            // sortable: true,
            // dataIndex: 'duration',
            // align: 'center'
            // }]

            this.getDataInfo().down('#rawdata').add(tree_panel);

        } 

        if(this.getContentChange()) {
            this.loadGrid();
            this.loadTree();

            this.setContentChange(false);
        }
    },
        


    onTreeDataSelect: function(view, record, item, index, e, eOpts ) {
        
        if(this.getHierarchyStatus()) {
            console.log("onTreeDataSelect(): select data item: ", record.data);

            // add to selectedItems
            //this.getSelectedItems().push({'name': record.data.name});
            this.setSelectedItems([record.data.name]);

            //var vizController = this.getController('Viz');
            //var chart = vizController.getVizChart();

            //chart.getLayout().getActiveItem().setSelectedItems(this.getSelectedItems());

            this.application.fireEvent('treedataselect', this.getSelectedItems());

        }

    },

    onMetaDataSelect: function(view, record, item, index, e, eOpts ) {
        console.log("onMetaDataSelect(): select data item: ", record.data);

        if(this.getMetaTree().children.length > 0) {
            var r = this.getStoreRoot();
            if(r != record.get('name')) {
                this.setStoreRoot(record.get('name'));
                //console.log("tree click set store_root: ", store_root); 
                this.setContentChange(true);
                this.loadGrid();
            }
        }
    },


    onTreeDataSelectionChange: function(selection) {

        console.log("Data.js, receive application level event: treedataupdate");

        var tree_panel = this.getDataInfo().down('#rawdata').down('#treepanel');
        var tree_store = this.getTreeDataStore();

        var record = tree_store.getNodeById(selection[0]);
        //console.log("select record: ", record);
        var selModel = tree_panel.getSelectionModel();
        if(selModel.isSelected(record)) selModel.deselect(record);
        else selModel.select(record);        

    },

    //-----------------------------------------------------------------------------
    // instead of using Ext to load json from url
    // I do data loading myself, this task handles: 
    // ---- paging large data (Ext 4.2's data paging implementation has a bug)
    // ---- read non-json data, such as csv
    //-----------------------------------------------------------------------------

    requestDataset: function(datasetfilename) {
        //need to request data and know the header fields to create store for grid
        //var that = this;

        if (datasetfilename != null && datasetfilename != "") {
            Ext.Ajax.request({
                url: 'data/' + datasetfilename,
                scope: this,
                success: function(result, request) {
                    this.getData(datasetfilename, result.responseText);
                    //json_data = Ext.JSON.decode(result.responseText);
                    //this.loadGrid();
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        }
    },

    decorateTree: function(treeroot) {

        function displayfield(node) {
            var text = '';
            for( var item in node){
                if(item === 'name'){ text = node.name; break; }
                if(item != 'children') text += (item + ':' + node[item] + ' ');
            }
            return text;
        }

        function recurse(node) {
            if(node.name === undefined) node.name = displayfield(node);
            node.id = node.name;

            if(node.children){
                node.expanded = true;
                
                node.children.forEach(function(child){ recurse(child); });
            }
            else node.leaf = true;
        }

        recurse(treeroot);

    },

    getData: function(datasetfilename, response) {
        //console.log("getData");

        var json_data = {};

        if(datasetfilename.search(/.json$/) != -1) {
            json_data = Ext.JSON.decode(response);
            //console.log(json_data);

            if(this.getHierarchyStatus()) {
                // add attributes to json_data, so it can be used for treestore
                //console.log("decorate tree");
                this.decorateTree(json_data);
                //console.log(json_data);
            }
            else{
                
                var fields = this.getModelFields().default;
                console.log("convert json data to array: ", fields[0].name, fields[1].name);

                //console.log(Object.keys(json_data).length);
                var new_json_data = [];

                var f0 = fields[0].name;
                var f1 = fields[1].name;

                for(var id in json_data){
                    var item = {};
                    item[f0] = id;
                    item[f1] = json_data[id];
                    new_json_data.push(item);
                }
                //console.log(new_json_data);

                json_data = {};
                json_data.default = new_json_data;
            }

        } else if(datasetfilename.search(/.csv$/) != -1) {
            
            var csvdata = response.split('\n');
            var length = csvdata.length;

            if(csvdata[length-1] === '') length = length-1;
            //console.log("csvdata: ", length, csvdata[length-1]);            

            var header = csvdata[0].split(',');
            console.log(header);

            //had so many problems when a csv file has DOS encoding style
            //that is, there is an extra \r\n at the end of line
            //so the last field turns out have a \r hanging onto it
            //which causes JSON error "ILLEGL" token. 
            //change to unix encoding fix the problem -- but I choose to use the 
            //fields defined in alldata.json file now. 
            //this.build_results_grid(header);

            //var header = metadata[0]['fields'];
            //console.log("header: ", header);


            
            json_data.default = [];
            for (var d = 1; d < length; d++) {
                //for (var d = 1; d < 2; d++) {
                var csvrecord = csvdata[d].split(',');
                var r = csvrecord.map(function(d, i){ 
                    return d.replace(/"/g, ''); 
                });
                //array_data.push(r);

                var jsonrecord = {};
                header.forEach(function(h, i){ jsonrecord[h] = r[i]; });
                json_data.default.push(jsonrecord);
            }

        }

        this.setJsonData(json_data);
    },

    read_metadata: function(metadata) {

        console.log("read_metadata");
        
        var data_roots = [];
        var model_fields = {};
        var column_Array = {};
        var is_hierarchy = false;
        var store_root = '';

        metadata.forEach( function(m, mi){
            var r = m.root;
            var f = m.fields;
            var t = m.tree;
            if(t === 'yes'){ is_hierarchy = true; console.log("data is hierarchy"); }
            

            if(r==='')
                r = 'default'; 
            //else 
            data_roots.push({name: r, id: r, leaf: true});

            store_root = r;
           
            //console.log(store_root);

            model_fields[r] = [];
            column_Array[r] = [];

            if(f != undefined) {
                f.forEach(function(h, hi){
                    model_fields[r].push({name: h, type: 'string'});
                    column_Array[r].push({text: h, dataIndex: h});
                });         
            }          
            //console.log(metatree, model_fields[r], columnsArr[r]);        
        });

        //console.log("model_fields: ", model_fields, "column_Array: ", column_Array);        
        //console.log("data_roots: ", data_roots, "store_root: ", store_root);  

        this.setStoreRoot(store_root);
        this.setModelFields(model_fields);
        this.setColumnsArr(column_Array);
        this.getMetaTree().children = data_roots;
        this.setHierarchyStatus(is_hierarchy);

        //console.log(this.getModelFields());


        // refresh the metadata view
        var meta_store = this.getMetaDataStore();
        meta_store.setRootNode(this.getMetaTree());
        meta_store.sync();

        var meta_panel = this.getMetadataPanel();

        // var columns = [{
        //     xtype: 'treecolumn', //this is so we know which column will show the tree
        //     text: 'Name',
        //     flex: 1,
        //     sortable: true,
        //     dataIndex: 'name'
        //     }];

        // meta_panel.reconfigure(meta_store, columns);
        meta_panel.getView().refresh();

        var record = meta_store.getNodeById(this.getStoreRoot());
        console.log("select record: ", record.data);

        meta_panel.getSelectionModel().select(record);   
      
    },


    mycopy: function(oldObject) {
        // Shallow copy
        //var newObject = jQuery.extend({}, oldObject);

        // Deep copy
        var newObject = jQuery.extend(true, {}, oldObject);

        return newObject;
    },

    loadTree: function() {


        console.log("data controller: loadTree");


        var tree_panel = this.getDataInfo().down('#rawdata').down('#treepanel');
        var tree_store = this.getTreeDataStore();


        var is_hierarchy = this.getHierarchyStatus();
        var json_data = this.getJsonData();


        //console.log("json_data: ", json_data);

        if(is_hierarchy) {


            //!!! Bug: once I call this, or setRootNode, the same, the json_data
            //will be altered. In detail, only one level of children are kept
            //under treestore's root node. 
            //to work around this bug, json_data must be deep copied before
            //passing to setRootNode or appendChild
            //otherwise my raw data is lost!!!

            if(!tree_store.getRootNode().hasChildNodes()) {
                var copied_json = this.mycopy(json_data);
                //tree_store.getRootNode().appendChild(copied_json);
                tree_store.setRootNode(copied_json);
                copied_json = null;
            }
            //console.log(tree_store.getRootNode().hasChildNodes());

            //tree_store.proxy.data = json_data;

            // // test tree grid stuff -- not working with my way of doing things
            var columns = this.getColumnsArr()[this.getStoreRoot()];
            columns.forEach(function(d, i) {
                console.log("column item: ", d);
                if(d.text === 'name'){
                    d.xtype = 'treecolumn';
                    d.flex = 2;
                }
                else d.flex = 1;
            });
            //console.log(columns);
            tree_panel.reconfigure(tree_store, columns);
            tree_panel.show();

        }        
        else tree_panel.hide();

    },


    loadGrid: function() {


        console.log("data controller: loadGrid");


        var grid_panel = this.getDataInfo().down('#rawdata').down('#gridpanel');      
        var grid_model = this.getDataModel();
        var grid_store = this.getDataStore();

        var root = this.getStoreRoot();
        var is_hierarchy = this.getHierarchyStatus();

        if(is_hierarchy) { 
            grid_panel.hide();

            return;
        }


        var fields = this.getModelFields()[root];
        var data = this.getJsonData()[root];
        var columns = this.getColumnsArr()[root];

        //console.log("grid_model: change fields: ", fields);
        grid_model.setFields(fields);

        //console.log("grid_store: load raw data"); //, json_data[root]);
        grid_store.loadRawData(data);

        grid_panel.reconfigure(grid_store, columns);
        grid_panel.show();

    }

    //end of controller define body
});
