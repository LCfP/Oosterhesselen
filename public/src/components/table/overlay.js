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
                // background remains when clicking new links in overlay -> annoying.
                $("div.modal-backdrop.fade.in").remove();

                this._getPerson(e.target.text)
            }
        });

        // closes the overlay
        $("button.close").click(e => {
            $("#people-overlay").modal('hide');
        });
    }

    /**
     * @override
     */
    preRender(state)
    {
        if (state.person) {
            // If there is source material, we display the source annotation
            if (state.person["Doop bron"]
                || state.person["Geboorte bron"]
                || state.person["Overlijden bron"]) {
                state.person.showSourcing = true;
            }

            // If at least one parent is known.
            if (state.person["Vader"]
                || state.person["Moeder"]) {
                state.person.showParents = true;
            }

            // If we have a DoB..
            if (state.person["Geboorte datum"]) {
                state.person.showBirth = true;
            }

            // ..or DoD, we display that information
            if (state.person["Overlijden datum"]) {
                state.person.showDeath = true;
            }

            if (state.person.relations) {
                // sorts by marriage number (first marriage, second, third etc..)
                state.person.relations = state.person.relations.sort((a, b) => {
                    const cases = {"M": "Huwman nr", "V": "Huwvrouw nr"};
                    const key = cases[state.person["Geslacht"]];

                    return parseInt(a[key]) - parseInt(b[key]);
                })
            }
        }

        return state;
    }

    _getPerson(id)
    {
        const ajaxCall = (url) => $.ajax({url: url});

        this._setState({isLoading: true});

        $.when(
            ajaxCall(`./person/${id}`),
            ajaxCall(`./relation/${id}`),
            ajaxCall(`./person/children/${id}`)
        ).done((data_person, relations, children) => {
            // Eloquent outputs an array of results (so first entry of
            // result array, and then first result of thát.
            const person = data_person[0][0];

            if (relations) {
                // first array entry is result of call.
                person.relations = relations[0];
            }

            if (children) {
                // first array entry is result of call.
                person.children = children[0];
            }

            this._setState({
                person: person,
                isLoading: false
            });

            $("#people-overlay").modal('show');
        });
    }
}

export default Overlay;
