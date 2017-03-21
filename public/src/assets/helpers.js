import settings from './settings';
import Handlebars from 'handlebars-template-loader/runtime';

Handlebars.registerHelper('isID', function (candidate, options) {
    "use strict";
    return _helper(settings.table.columns.isID.indexOf(candidate) > -1, options);
});

Handlebars.registerHelper('eq', function (self, other, options) {
    "use strict";
    return _helper(self == other, options);
});

function _helper(expression, options)
{
    "use strict";
    if (expression) {
        return options.fn(this);
    }

    return options.inverse(this);
}
