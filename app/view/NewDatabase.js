Ext.define('DVSI.view.NewDatabase', {
    extend: 'Ext.form.field.ComboBox',
    emptyText: 'Select New database',
    alias: 'widget.newdatabase',
    store: 'NewDatabase',
    queryMode: 'local',
    displayField: 'name',
    valueField: 'id'
});
