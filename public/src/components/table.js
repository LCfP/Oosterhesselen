import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui/Table';
import Axios from 'axios';

const tableData = [
    {
        name: 'John Smith',
        status: 'Employed'
    },
    {
        name: 'Randal White',
        status: 'Unemployed',
    },
    {
        name: 'Stephanie Sanders',
        status: 'Employed'
    },
    {
        name: 'Steve Brown',
        status: 'Employed',
    },
    {
        name: 'Joyce Whitten',
        status: 'Employed',
    },
    {
        name: 'Samuel Roberts',
        status: 'Employed',
    },
    {
        name: 'Adam Moore',
        status: 'Employed',
    },
];

class TableComponent extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            fixedHeader: true,
            stripedRows: false,
            showRowHover: true,
            selectable: false,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: '600px',
            rows: [],
            pagination: this.props.pagination,
            perPage: this.props.perPage,
            hasNext: true,
            headers: []
        };
    }

    componentWillMount()
    {
        this.loadMore();
    }

    /**
     * Renders an additional set of records.
     */
    loadMore()
    {
        if (!this.state.hasNext) {
            return;
        }

        Axios.get(`./person/${this.state.pagination}/${this.state.perPage}`).then(
            res => {
                const data = res.data;

                this.setState((prevState, props) => {
                    return {
                        hasNext: Boolean(data['next_page_url']),
                        rows: prevState.rows.concat(data.data),
                        pagination: prevState.pagination + 1,
                        headers: Object.keys(data.data[0])
                    }
                });
            }
        );
    }

    render() {
        return (
            <div>
                <Table
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        <TableRow>
                            <TableHeaderColumn colSpan="3" style={{textAlign: 'center'}}>
                                Personen
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {tableData.map( (row, index) => (
                            <TableRow key={index}>
                                <TableRowColumn>{index}</TableRowColumn>
                                <TableRowColumn>{row.name}</TableRowColumn>
                                <TableRowColumn>{row.status}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default TableComponent;
