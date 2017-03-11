import toastr from 'toastr';
import settings from '../assets/settings';

import 'toastr/build/toastr.css';

/**
 * Basic class for Components on the webpage. This class will be extended by other components.
 */
class Component
{
    /**
     *
     * @param {Object} props={} - General non-state dependent properties
     * @param {Object} state={} - State-dependentent values. Use this only for init, update with `setState`
     */
    constructor(props={}, state={})
    {
        this.settings = settings;
        this.props = _set(props);

        this.message = toastr;
        this.message.options = this.settings.message;

        this._setState(state);
    }

    mount()
    {
        // registers events etc. (to be overridden)
    }

    render()
    {
        if (!(this.props.template && this.props.anchor)) {
            throw "Cannot render Component, since it has not specified a template, nor an achor!";
        }

        const renderType = this.props.options && this.props.options.renderType
            ? this.props.options.renderType : "replace";
        const compiled = this.props.template(this.state);
        const $anchor = $(this.props.anchor);

        const cases = {
            "append": $anchor.append.bind($anchor),
            "prepend": $anchor.prepend.bind($anchor),
            "replace": $anchor.html.bind($anchor)
        };

        //$anchor.html(compiled);
        cases[renderType](compiled);
    }

    _setState(stateProvider, reRender=true)
    {
        const updatedState = typeof stateProvider === 'function'
            ? stateProvider(this.state) : stateProvider;

        this.state = _set(updatedState, this.state);

        if (reRender) {
            this.render();
        }

        this.mount();
    }
}

function _set(values, target={})
{
    Object.keys(values).forEach(function(key) {
        target[key] = values[key];
    });

    return target;
}

export default Component;
