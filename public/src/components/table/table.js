import Component from '../component';
import Template from "../../../templates/table/table.hbs";
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
    }
}

export default Table;
