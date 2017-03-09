import Component from "../component";
import Template from "../../../templates/nav/topbar.hbs";
import "../../styles/topbar.css";


class Topbar extends Component
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

export default Topbar;
