import Handlebars from 'handlebars-template-loader/runtime';

Handlebars.registerHelper('eq', function (candidate, comparator, options) {
    "use strict";
    if (candidate == comparator) {
        return options.fn(this);
    }

    return options.inverse(this);
});
