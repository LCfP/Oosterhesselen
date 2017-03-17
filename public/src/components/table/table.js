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
        // selection pagination (no. items to get per additional load)
        $("#pagination_select").change(e => {
            const select = parseInt($("#pagination_select option:selected").text());
            this._setState(prevState => {
                return {
                    rows: [],
                    pagination: {
                        page: 1,
                        options: prevState.pagination.options.map(option => {
                            return {
                                value: option.value,
                                selected: select == option.value
                            }
                        })
                    }
                }
            }, false);

            this.message.success(`Gelukt! We halen nu ${select} personen per keer op!`);
            this._getPersons();
        });

        // obtains more items (actual toggle, button)
        $("#load-more").click(e => this._getPersons());

        // filters for the data presentation
        $("input[data-input='header-filter']").change(e => {
            const $handler = $(e.target);
            const value = $(e.target).val();

            this._setState(prevState => {
                prevState.filters[$handler.attr('name')] = value;
                prevState.pagination.page = 1;

                return {
                    rows: [],
                    filters: prevState.filters,
                    pagination: prevState.pagination
                }
            });

            this.message.info("De nieuwe filters zijn ingesteld!");
            this._getPersons();
        });
    }

    /**
     * @private
     */
    _getPersons()
    {
        const selection = this.state.pagination.options.filter(item => item.selected).shift();
        const page = this.state.pagination.page;

        this._setState({loading: true});

        $.post(
            `./person/${page}/${selection.value}`,
            {filters: this.state.filters},
            data => {
                this._setState(prevState => {
                    const pagination = prevState.pagination;

                    pagination.page = page + 1;
                    pagination.hasNextPage = !!data.next_page_url;

                    // filter to only include the columns we want to show.
                    data.data = _filterColumns(data.data, this.state.columns.show);

                    return {
                        rows: (prevState.rows || []).concat(data.data),
                        pagination: pagination,
                        loading: false
                    }
                });
            }
        );
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
