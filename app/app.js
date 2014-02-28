Ext.application({
    name: 'DVSI',
    
    autoCreateViewport: true,
    
    models: ['Dataset', 'Database', 'TreeData', 'MetaData', 'Viz', 'General'],
    stores: ['Database', 'Dataset', 'TreeData', 'MetaData', 'NewDatabase', 'Viz', 'General'],
    controllers: ['Viz', 'Data', 'Database']
    //models: ['Database'],
    //stores: ['NewDatabase']
});
