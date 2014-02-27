Ext.application({
    name: 'DVSI',
    
    autoCreateViewport: true,
    
    models: ['Dataset', 'Database', 'Viz', 'General'],
    stores: ['Database', 'Dataset', 'NewDatabase', 'Viz', 'General'],
    controllers: ['Viz', 'Data', 'Database']
    //models: ['Database'],
    //stores: ['NewDatabase']
});
