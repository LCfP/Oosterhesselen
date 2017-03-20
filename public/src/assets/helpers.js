import settings from './settings';
import Handlebars from 'handlebars-template-loader/runtime';

Handlebars.registerHelper('isID', function (candidate, options) {
    "use strict";
    if (settings.table.columns.isID.indexOf(candidate) > -1) {
        return options.fn(this);
    }

    return options.inverse(this);
});
