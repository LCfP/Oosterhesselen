import React from 'react';
import ReactDOM from 'react-dom';
import FixedDataTable from 'fixed-data-table';
import Axios from 'axios';

const {Table, Column, Cell} = FixedDataTable;

const TextCell = ({rowIndex, data, col}) => (
    <Cell>
        {data[rowIndex][col]}
    </Cell>
);

class TableComponent extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            rows: [],
            pagination: this.props.pagination,
            perPage: this.props.perPage,
            hasNext: true,
            headers: []
        };
    }

    componentDidMount()
    {
        this.loadMore();
    }

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
                        rows: data.data,
                        pagination: prevState.pagination + 1,
                        perPage: prevState.perPage,
                        headers: Object.keys(data.data[0])
                    }
                });
            }
        );
    }

    render()
    {
        const columns = this.state.headers.map((header, index) => {
            return (
                <Column
                    key={index}
                    header={<Cell>{header}</Cell>}
                    flexGrow={1}
                    width={100}
                    cell={<TextCell data={this.state.rows} col={header} />}
                />
            )
        });

        return (
            <Table
                rowHeight={50}
                rowsCount={this.state.rows.length}
                headerHeight={50}
                width={1280}
                height={640}>
                {columns}
            </Table>
        )
    }
}

ReactDOM.render(
    <TableComponent pagination="1" perPage="50"/>,
    document.getElementById('root')
);

export default TableComponent;
