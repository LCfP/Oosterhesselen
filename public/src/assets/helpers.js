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

Handlebars.registerHelper('makeOverlayEntry', function (name, options) {
    "use strict";
    return `<div class="row">
                <div class="col-sm-2">
                    <h5>${name}</h5>
                </div>
                <div class="col-sm-10 align-text">`
                    + options.fn(this)
             + `</div>
            </div>`;
});

function _helper(expression, options)
{
    "use strict";
    if (expression) {
        return options.fn(this);
    }

    return options.inverse(this);
}
