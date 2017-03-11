import Component from '../component';
import Template from "../../../templates/body/table/table.hbs";

import "../../styles/table.css";


class Table extends Component
{
    /**
     * @override
     */
    constructor(props={}, state={})
    {
        props.template = Template;

        super(props, state);

        this._setState(this.settings.table);
        this._getPersons();
    }

    /**
     * @override
     */
    mount()
    {
        $("#pagination_select").change(e => {
            const select = $("#pagination_select option:selected").text();

            this._setState(prevState => {
                this.message.success(`Gelukt! We halen nu ${select} personen per keer op!`);

                return {
                    headers: [],
                    rows: [],
                    pagination: {
                        page: 0,
                        options: prevState.pagination.options.map(option => {
                            return {
                                value: option.value,
                                selected: parseInt(select) == option.value
                            }
                        })
                    }
                }
            }, false);

            this._getPersons();
        });

        $("#load-more").click(e => {
            this.message.info("Bezig meer personen op te halen!");
            this._getPersons();
        })
    }

    /**
     * @private
     */
    _getPersons()
    {
        const selection = this.state.pagination.options.filter(item => item.selected).shift();
        const page = this.state.pagination.page;

        $.getJSON(`./person/${page}/${selection.value}`).done(data => {
            this._setState(prevState => {
                const pagination = prevState.pagination;

                pagination.page = page + 1;
                pagination.hasNextPage = !!data.next_page_url;

                // filter to only include the columns we want to show.
                data.data = _filterColumns(data.data, this.state.columns.show);

                return {
                    headers: Object.keys(data.data[0]),
                    rows: (prevState.rows || []).concat(data.data),
                    pagination: pagination
                }
            });
        });
    }
}

function _filterColumns(rows, shownColumns)
{
    "use strict";

    return rows.map(row => {
        // see http://stackoverflow.com/a/37616104/4316405
        return Object.keys(row)
            .filter(key => shownColumns.indexOf(key) > -1)
            .reduce((result, key) => (result[key] = row[key], result), {});
    })
}

export default Table;
