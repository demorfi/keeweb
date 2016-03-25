'use strict';

var Backbone = require('backbone'),
    SettingsStore = require('../comp/settings-store');

var UpdateModel = Backbone.Model.extend({
    defaults: {
        lastSuccessCheckDate: null,
        lastCheckDate: null,
        lastVersion: null,
        lastVersionReleaseDate: null,
        lastCheckError: null,
        lastCheckUpdMin: null,
        status: null,
        updateStatus: null,
        updateError: null,
        updateManual: false
    },

    initialize: function() {
    },

    load: function() {
        var data = SettingsStore.load('update-info');
        if (data) {
            try {
                _.each(data, function(val, key) {
                    if (/Date$/.test(key)) {
                        data[key] = val ? new Date(val) : null;
                    }
                });
                this.set(data, { silent: true });
            } catch (e) { /* failed to load model */ }
        }
    },

    save: function() {
        var attr = _.clone(this.attributes);
        Object.keys(attr).forEach(function(key) {
            if (key.lastIndexOf('update', 0) === 0) {
                delete attr[key];
            }
        });
        SettingsStore.save('update-info', attr);
    }
});

UpdateModel.instance = new UpdateModel();
UpdateModel.instance.load();

module.exports = UpdateModel;
