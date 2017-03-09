import 'bootstrap';

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
        this.state = this._set(state);


    }

    setState(state)
    {
        Object.keys(state).forEach(function(key) {
            this.state[key] = state[key];
        });

        this.render()
    }

    render()
    {
        if (!(this.location && this.anchor)) {
            throw "Cannot render Component, since it has not specified a location, nor an achor!"
        }

        $.get("/" + this.location).done(data => {

        });
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
