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
        this.props = this._set(props);

        this._setState(state);
        this.mount();
    }

    mount()
    {
        // registers events etc. (to be overridden)
    }

    render(options={})
    {
        options.renderType = options.renderType ? options.renderType : "replace";

        if (!(this.props.template && this.props.anchor)) {
            throw "Cannot render Component, since it has not specified a template, nor an achor!";
        }

        const compiled = this.props.template(this.state);
        const $anchor = $(this.props.anchor);
        const cases = {
            "append": $anchor.append,
            "prepend": $anchor.prepend,
            "replace": $anchor.html
        };

        cases[options.renderType](compiled);
    }

    _setState(state)
    {
        this.state = this._set(state);
        this.render()
    }

    _set(values, target={})
    {
        Object.keys(values).forEach(function(key) {
            target[key] = values[key];
        });

        return target;
    }
}

export default Component;
