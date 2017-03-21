import Component from '../component';
import Template from "../../../templates/body/table/overlay.hbs";

import "../../styles/overlay.css";


class Overlay extends Component
{
    /**
     * @override
     */
    constructor(props={}, state={})
    {
        props.template = Template;

        super(props, state);
    }

    /**
     * @override
     */
    mount()
    {
        // opens the overlay
        $("a.data-overlay").click(e => {
            if (!this.state.isLoading) {
                this._getPerson(e.target.text)
            }
        });

        // closes the overlay
        $("button.close").click(e => {
            $("#people-overlay").modal('hide');
        });
    }

    _getPerson(id)
    {
        this._setState({isLoading: true});

        $.get({
            url: `./person/${id}`,
            success: res => {
                const data = res.shift();

                if (data["Doop bron"] || data["Geboorte bron"] || data["Overlijden bron"]) {
                    data.showSourcing = true;
                }

                if (data["Geboorte datum"] || data["Overlijden datum"]) {
                    data.showLifetime = true;
                }

                this._setState({
                    person: data,
                    isLoading: false
                });

                $("#people-overlay").modal('show');
            }
        });
    }
}

export default Overlay;
